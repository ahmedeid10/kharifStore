import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../compontents/SliderProducts/Product";
import "./Category.css";
import SlideProductLoading from "../../compontents/SliderProducts/SlideProductLoading";
import PageTransition from "../../compontents/PageTransition";

function Categroy() {
  //! useparams to knowlge category name
  const { category } = useParams();
  //! State To Save category name
  const [categoryProducts, setCategoryProducts] = useState([]);
  //! State Of Loading
  const [loading, setLoading] = useState(true);
  //! UseEffect To Fetch Api Categroy
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <PageTransition key={category}>
      <div className="category_product">
        {loading ? (
          <SlideProductLoading key={category} />
        ) : (
          <div className="container">
            <div className="top_slide">
              <h2>
                {category.replace("-", " ")} : {categoryProducts.limit}
              </h2>
              <p>Add Besting Products To Weekly Line Up</p>
            </div>
            <div className="products">
              {categoryProducts.products.map((item) => (
                <Product item={item} key={item.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default Categroy;
