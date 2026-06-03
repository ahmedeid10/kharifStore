import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  //! To Get Location
  const { pathname } = useLocation();
  //! To Scroll Top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior:"smooth"
    });
  }, [pathname]);
  return null;
}

export default ScrollToTop;
