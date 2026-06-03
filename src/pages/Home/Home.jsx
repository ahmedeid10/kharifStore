import { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../../compontents/HeroSlider";
import SlideProduct from "../../compontents/SliderProducts/SlideProduct";
import "./Home.css";
import SlideProductLoading from "../../compontents/SliderProducts/SlideProductLoading";
import PageTransition from "../../compontents/PageTransition";

export default function Home() {
  //! State Of Loading
  const [loading, setLoading] = useState(true);

  //! State Of Categories
  const [categories, setCategories] = useState([]);

  //! State Of Products
  const [products, setProducts] = useState({});

  //! Use Effect To Api Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //* Fetch Categories First
        const { data: categoriesData } = await axios.get(
          "https://dummyjson.com/products/category-list"
        );

        //* Save Categories
        setCategories(categoriesData);

        //* Fetch Products Of Each Category
        const result = await Promise.all(
          categoriesData.map(async (category) => {
            const { data } = await axios.get(
              `https://dummyjson.com/products/category/${category}`
            );

            return {
              [category]: data.products,
            };
          })
        );

        //* Convert Array Of Objects To One Object
        const productsData = Object.assign({}, ...result);

        //* Save Products
        setProducts(productsData);
      } catch (error) {
        console.error("Error Catching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
 console.log(categories)
  return (
    <PageTransition>
      <div>
        <HeroSlider />

        {loading
          ? categories.map((category) => (
              <SlideProductLoading key={category} />
            ))
          : categories.map((category) => (
              <SlideProduct
                key={category}
                data={products[category]}
                title={category.replace("-", " ")}
              />
            ))}
      </div>
    </PageTransition>
  );
}