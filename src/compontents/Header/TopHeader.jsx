import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./header.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import SearchBox from "./SearchBox";

export default function TopHeader() {
  const { cartItems, favorites } = useContext(CartContext);
  return (
    <div className="top_header">
      <div className="container">
        <Link to="/" className="logo">
         <img src="/img/logo.png" alt="Logo" />
        </Link>
        <SearchBox />
        <div className="header_icons">
          <div className="icon">
            <Link to="/fav">
              <FaRegHeart />
              <span className="count">{favorites.length}</span>
            </Link>
          </div>

          <div className="icon">
            <Link to="/cart">
              <FaShoppingCart />
              <span className="count">{cartItems.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
