import { useUser } from "@clerk/react-router";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useUser();

  const cartKey = `cart_${user?.id}`;
  const favKey = `fav_${user?.id}`;
  const ordersKey = `orders_${user?.id}`;

  //**-----------------------------Favorites------------------------ **

  const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem(`fav_${user?.id}`);
    return savedFav ? JSON.parse(savedFav) : [];
  });

  //! Add To Favorite
  const addToFavorateies = (item) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };
  //! Add To localStroge
  useEffect(() => {
    localStorage.setItem(`fav_${user?.id}`, JSON.stringify(favorites));
  }, [favorites]);

  //! Remove From Favorites
  const removeFromFavorateies = (id) => {
    setFavorites((prev) => prev.filter((i) => i.id != id));
  };

  // **--------------------------------Cart ----------------------------**

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(`cart_${user?.id}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  //! Function IncreaseQuantity
  const IncreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  //! Function DecreaseQuantity
  const DecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  //! Remove From Cart
  const RemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id != id));
  };

  //! Function Add Item To Cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  //! Add Items To LocalStroge
  useEffect(() => {
    localStorage.setItem(`cart_${user?.id}`, JSON.stringify(cartItems));
  }, [cartItems]);

  // ! Clear Cart After Confrim Bayment
  const ClearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        IncreaseQuantity,
        DecreaseQuantity,
        RemoveFromCart,
        favorites,
        addToFavorateies,
        removeFromFavorateies,
        ClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
