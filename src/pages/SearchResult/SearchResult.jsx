import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../../compontents/PageTransition";
import SlideProductLoading from "../../compontents/SliderProducts/SlideProductLoading";
import Product from "../../compontents/SliderProducts/Product";

function SearchResult() {
  const query = new URLSearchParams(useLocation().search).get("query");

  //! State Of Search Result
  const [results, setResults] = useState([]);
  //! State Of Loading
  const [loading, setLoading] = useState(true);
  //! Fetch To Api Search
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResult();
  }, [query]);
  console.log(results);
  return (
    <PageTransition key={query}>
      <div className="category_product">
        {loading ? (
          <SlideProductLoading key={query} />
        ) : results.length > 0 ? (
          <div className="container">
            <div className="top_slide">
              <h2>Results For : {query}</h2>
            </div>
            <div className="products">
              {results.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <p>No Result Found .. </p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default SearchResult;
