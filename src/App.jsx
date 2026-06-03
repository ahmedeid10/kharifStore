import "./App.css";
import { Route, Routes } from "react-router-dom";
import BottomHeader from "./compontents/Header/BottomHeader";
import TopHeader from "./compontents/Header/TopHeader";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetalis/ProductDetails";
import Cart from "./pages/Cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./compontents/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Categroy from "./pages/Category/Categroy";
import SearchResult from "./pages/SearchResult/SearchResult";
import { SignIn, SignUp } from "@clerk/react";
import Favorites from "./pages/Favorites/Favorites";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/Blog/BlogDetails";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <div className="App">
      <>
        <header>
          <TopHeader />
          <BottomHeader />
        </header>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#e9e9e9",
              borderRadius: "5px",
              padding: "14px",
            },
          }}
        />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/category/:category" element={<Categroy />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/fav" element={<Favorites />} />
            <Route path="/search" element={<SearchResult />} />

            <Route
              path="/sign-in/*"
              element={
                <div className="auth_page">
                  <SignIn />
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div className="auth_page">
                  <SignUp />
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </>
    </div>
  );
}

export default App;
