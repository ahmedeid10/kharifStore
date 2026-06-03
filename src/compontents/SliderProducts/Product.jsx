import { useContext } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaHeart,
  FaShoppingCart,
  FaShareAlt,
  FaCheck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useUser } from "@clerk/react";

function Product({ item }) {
  const {
    cartItems,
    addToCart,
    favorites,
    addToFavorateies,
    removeFromFavorateies,
  } = useContext(CartContext);
  //! clerck
  const { isSignedIn } = useUser();
  //! UseNavagate To Go Cart Page
  const navigate = useNavigate();

  //*---------------------------Cart-----------------------
  //! Function HandleAddToCart
  const HandleAddToCart = () => {
    if (!isSignedIn) {
      const audio = new Audio("/sound/wrong.mp3");
      audio.play();
      toast.error("Please Login First");
      navigate("/sign-in");
      return;
    }
    addToCart(item);
    const audio = new Audio("/sound/add.mp3");
    audio.play();
    toast.success(
      <div className="toast_wrapper">
        <img src={item.images[0]} alt={item.title} className="toast_img" />
        <div className="toast_content">
          <strong>{item.title}</strong>
          added to cart
          <button className="btn" onClick={() => navigate("/cart")}>
            view cart
          </button>
        </div>
      </div>,
      { duration: 5000 },
    );
  };
  //! Check Item In Cart
  const isInCart = cartItems.some((i) => i.id === item.id);

  // *----------------------------Favorites-------------
  //! Check Item In Favorites
  const isInFavorites = favorites.some((i) => i.id === item.id);
  //! Add To Favorites
  const HandleAddToFav = () => {
    if (isInFavorites) {
      const audio = new Audio("/sound/wrong.mp3");
      audio.play();
      toast.error("Remove From Favorites");
      removeFromFavorateies(item.id);
    } else {
      addToFavorateies(item);
      const audio = new Audio("/sound/add.mp3");
      audio.play();
      toast.success(
        <div className="toast_wrapper">
          <img src={item.images[0]} alt={item.title} className="toast_img" />
          <div className="toast_content">
            <strong>{item.title}</strong>
            added to Favorites
            <button className="btn" onClick={() => navigate("/fav")}>
              view Favorites
            </button>
          </div>
        </div>,
        { duration: 5000 },
      );
    }
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        <span className="satus_Crat">
          <FaCheck /> In Cart
        </span>
        <div className="img_product">
          <img src={item.images[0]} alt="" />
        </div>
        <p className="product_name">{item.title}</p>
        <div className="starts">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <p className="price">
          <span>$ {item.price} </span>
        </p>
      </Link>
      <div className="icons">
        <span className="btn-cart">
          <FaShoppingCart onClick={HandleAddToCart} />
        </span>

        <span id="btn-fav" className={`${isInFavorites ? "in_fav" : ""}`}>
          <FaHeart onClick={HandleAddToFav} />
        </span>

        <span>
          <FaShareAlt />
        </span>
      </div>
    </div>
  );
}

export default Product;
