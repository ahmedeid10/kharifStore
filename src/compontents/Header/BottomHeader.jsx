import { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSignInAlt } from "react-icons/fa";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useUser, UserButton } from "@clerk/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
uuidv4();

//! Array Of Nav Links
const NavLinks = [
  { id: uuidv4(), title: "Home", link: "/" },
  { id: uuidv4(), title: "About", link: "/about" },
  { id: uuidv4(), title: "Blog", link: "/blog" },
  { id: uuidv4(), title: "Orders", link: "/orders" },
  { id: uuidv4(), title: "Contact", link: "/contact" },
];
export default function BottomHeader() {
  //! Use Loction On Active Link
  const location = useLocation();
  //! State Of Api Links Data Category
  const [categories, setCategories] = useState([]);
  //! State To Open And Close Category List
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  //! State To Mobile icon
  const [mobileMenu, setMobileMenu] = useState(false);
  //! UseEffect To Close Category List
  useEffect(() => {
    setIsCategoryOpen(false);
  }, [location]);
  //! Api List Of Links Of Products Category
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // ! clerck
  const { isSignedIn, user } = useUser();
  return (
    <div className="bottom_header">
      <div className="container">
        {/* Mobile Icon */}
        <div
          className="mobile_menu_icon"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </div>
        {/* ------- Moblie Icon */}
        <nav className={`nav ${mobileMenu ? "open" : ""}`}>
          <div className="category_nav">
            <div
              className="category_btn"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <IoIosMenu className="menueCatogry" />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>

            {/* List Of Links Of Products Category */}
            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : ""}`}
            >
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => setMobileMenu(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/*Nav Links  */}
          <div className="nav_links">
            {NavLinks.map((item) => (
              <li
                key={item.id}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link to={item.link} onClick={() => setMobileMenu(false)}>
                  {item.title}{" "}
                </Link>
              </li>
            ))}
          </div>
        </nav>

        {/* Sin_Regs Icon */}
        <div className="sin_regs_icons">
          {isSignedIn ? (
            <div className="user_area">
              <span>{user?.firstName}</span>
              <UserButton />
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <FaSignInAlt />
              </Link>

              <Link to="/sign-up">
                <HiMiniUserPlus />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
