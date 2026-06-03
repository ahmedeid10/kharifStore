import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaStarHalfAlt,
  FaRegHeart,
} from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import SlideProduct from "../../compontents/SliderProducts/SlideProduct";
import SlideProductLoading from "../../compontents/SliderProducts/SlideProductLoading";
import "./ProductDetalis.css";
import ProductDetailesLoading from "./ProductDetailesLoading";
import { CartContext } from "../../compontents/Context/CartContext";
import toast from "react-hot-toast";
import PageTransition from "../../compontents/PageTransition";
import { useUser } from "@clerk/react";
function ProductDetails() {
  const { id } = useParams();

  //! UseState
  const [product, setProduct] = useState(null);
  //! State Of Loading
  const [loading, setLoading] = useState(true);

  //-------------
  //!To Get Oher Product In The Same Category
  const [reletedProducts, setReletedProducts] = useState([]);
  //! State Of Loading
  const [loadingReletedProducts, setLoadingReletedProducts] = useState(true);

  //--------------
  //! State Of Main Image
  const [mainImage, setMainImage] = useState("");

  //! UseEffect To Get Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
        setMainImage(data.images[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProduct();
  }, [id]);

  //! UseEffect To Get Oher Product In The Same Category
  useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setReletedProducts(data.products);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoadingReletedProducts(false));
  }, [product?.category]);

  //! From Context
  const {
    cartItems,
    addToCart,
    favorites,
    addToFavorateies,
    removeFromFavorateies,
  } = useContext(CartContext);
  //! UseNavagate To Go Cart Page
  const navigate = useNavigate();
  //! Check Item In Cart
  const isInCart = cartItems.some((i) => i.id === product?.id);
  //! State Of Disable Button
  const [disabledBtn, setDisabledBtn] = useState(false);
  // ! Celrek
  const { isSignedIn } = useUser();
  //! Function HandleAddToCart
  const HandleAddToCart = () => {
    if (!isSignedIn) {
      const audio = new Audio("/sound/wrong.mp3");
      audio.play();
      toast.error("Please Login First");
      navigate("/sign-in");
      return;
    }
    if (isInCart) {
      const audio = new Audio("/sound/wrong.mp3");
      audio.play();
      toast.error("Product already in cart");
      setDisabledBtn(true);
      return;
    }
    addToCart(product);
    const audio = new Audio("/sound/add.mp3");
    audio.play();
    toast.success(
      <div className="toast_wrapper">
        <img
          src={product.images[0]}
          alt={product.title}
          className="toast_img"
        />
        <div className="toast_content">
          <strong>{product.title}</strong>
          added to cart
          <button className="btn" onClick={() => navigate("/cart")}>
            view cart
          </button>
        </div>
      </div>,
      { duration: 5000 },
    );
  };

  //! Function HandleAddToFavorites
  //! Check Item In Favorites
  const isInFavorites = favorites.some((i) => i.id === product?.id);
  //! Add To Favorites
  const HandleAddToFav = () => {
    if (isInFavorites) {
      const audio = new Audio("/sound/wrong.mp3");
      audio.play();
      toast.error("Remove From Favorites");
      removeFromFavorateies(product.id);
    } else {
      addToFavorateies(product);
      const audio = new Audio("/sound/add.mp3");
      audio.play();
      toast.success(
        <div className="toast_wrapper">
          <img
            src={product.images[0]}
            alt={product.title}
            className="toast_img"
          />
          <div className="toast_content">
            <strong>{product.title}</strong>
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

  if (loading) return <ProductDetailesLoading />;
  if (!product) return <p>Sorry, Product Not Found ...</p>;
  return (
    <PageTransition key={id}>
      <div>
        <div className="item_details">
          <div className="container">
            {/************************  Images  *****************************/}
            <div className="imgs_item">
              <div className="big_img">
                <img src={mainImage} alt={product.title} />
              </div>
              <div className="small_img">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.title}
                    onClick={() => setMainImage(image)}
                    className={mainImage === image ? "active" : ""}
                  />
                ))}
              </div>
            </div>

            {/************************  Details  *****************************/}
            <div className="details_item">
              <h1 className="name">{product.title}</h1>
              <div className="starts">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <p className="price">$ {product.price}</p>
              <h5>
                Avaliability: <span>{product.availabilityStatus}</span>
              </h5>
              {product.brand && (
                <h5>
                  Brand: <span>{product.brand}</span>
                </h5>
              )}
              <p className="desc">{product.description}</p>
              <h5>
                Category: <span>{product.category}</span>
              </h5>
              <h5 className="stock">
                Hurry Up! Only <span>{product.stock}</span> Products left In The
                Stock
              </h5>
              <button
                className={`btn ${isInCart ? "in-cart" : ""}`}
                onClick={HandleAddToCart}
                disabled={disabledBtn}
              >
                {isInCart ? "Item In Cart" : "Add To Cart"} <FaShoppingCart />
              </button>
              <div className="icons">
                <span className={`${isInFavorites ? "in_fav" : ""}`}>
                  <FaRegHeart onClick={HandleAddToFav} />
                </span>
                <span>
                  <CiShare2 />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/************************  Loading  *****************************/}
        {loadingReletedProducts ? (
          <SlideProductLoading />
        ) : (
          <SlideProduct
            key={product.category}
            data={reletedProducts}
            title={product.category.replace("-", " ")}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default ProductDetails;
