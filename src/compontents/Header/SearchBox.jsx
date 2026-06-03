import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
function SearchBox() {
  //! State To Store Search results
  const [searchTerm, setSearchTerm] = useState("");
  //! State Suggestions
  const [suggestions, setSuggestions] = useState([]);

  //! Navigate
  const navigate = useNavigate();

  //! Location
  const location = useLocation();
  //! Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
    setSuggestions([]);
  };

  //! Fetch Suggestions
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`,
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error("error", error);
        setSuggestions([]);
      }
    };

    //* Dely Some Melly Scounds To Start Suggession
    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    setSuggestions([]);
    setSearchTerm("");
  }, [location]);

  return (
    <div className="Search_container">
      <form onSubmit={handleSubmit} className="search_box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products "
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <li key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.images[0]} /> <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
