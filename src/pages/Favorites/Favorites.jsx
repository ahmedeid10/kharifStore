import { useContext } from "react";
import { CartContext } from "../../compontents/Context/CartContext";
import PageTransition from "../../compontents/PageTransition";
import Product from "../../compontents/SliderProducts/Product";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";

function Favorites() {
  const { favorites } = useContext(CartContext);

  //! clerk
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <PageTransition>
      <div className="category_product favorites_product">
        <div className="container">
          <div className="top_slide">
            <h2>Your Favorites :</h2>
          </div>
          {favorites.length === 0 ? (
            <p>No Favorites Products Yet .</p>
          ) : (
            <div className="products">
              {favorites.map((item) => (
                <Product item={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;
