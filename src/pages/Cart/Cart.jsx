import { useContext, useState } from "react";
import { CartContext } from "../../compontents/Context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./cart.css";
import PageTransition from "../../compontents/PageTransition";
import { useUser } from "@clerk/react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
export default function Cart() {
  const { user } = useUser();
  //! Use Context To Get Cart Item From Cart Context
  const {
    cartItems,
    IncreaseQuantity,
    DecreaseQuantity,
    RemoveFromCart,
    ClearCart,
  } = useContext(CartContext);

  //! Stete Payment And Show Modle
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  //! Use Navagite
  const navigate = useNavigate();
  //! Total Price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // ! clerk
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  //! Function To Confirm Order And Save Orders In LocalStroge
  const handleConfirmOrder = () => {
  const oldOrders =
  JSON.parse(
    localStorage.getItem(`orders_${user.id}`)
  ) || [];

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: total.toFixed(2),
      paymentMethod,
      items: cartItems,
    };

localStorage.setItem(
  `orders_${user.id}`,
  JSON.stringify([...oldOrders, newOrder])
);

    ClearCart();

    const audio = new Audio("/sound/add.mp3");
    audio.play();
    toast.success("Order placed successfully");
    setShowCheckout(false);
    setTimeout(() => {
      navigate("/orders", {
        state: {
          lastOrderId: newOrder.id,
        },
      });
    }, 500);
  };
  return (
    <>
      <PageTransition>
        <div className="checkout">
          <div className="ordersummary">
            <h1>Order Summary</h1>

            <div className="items">
              {cartItems.length === 0 ? (
                <p>Your Cart Is Empty</p>
              ) : (
                cartItems.map((item, index) => (
                  <div className="item_cart" key={index}>
                    <div className="image_name">
                      <div className="img_item">
                        <img src={item.images[0]} alt={item.title} />
                      </div>
                      <div className="content">
                        <h4>{item.title}</h4>
                        <p className="price_item">$ {item.price}</p>
                        <div className="quantity_control">
                          <button onClick={() => IncreaseQuantity(item.id)}>
                            +
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button onClick={() => DecreaseQuantity(item.id)}>
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="delete_item"
                      onClick={() => RemoveFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="bottom_summary">
              <div className="shop_table">
                <p>Total: </p>
                <span className="total_checkout">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="button_div">
              <button
                type="button"
                onClick={() => {
                  if (cartItems.length === 0) {
                    toast.error("Your cart is empty");
                    return;
                  }

                  setShowCheckout(true);
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </PageTransition>

      {/* modle */}

      {showCheckout && (
        <div
          className="checkout_modal_overlay"
          onClick={() => setShowCheckout(false)}
        >
          <div className="checkout_modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Order</h2>

            <p className="total">Total: ${total.toFixed(2)}</p>

            <div className="payment_methods">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash On Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit Card
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Vodafone Cash"
                  checked={paymentMethod === "Vodafone Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Vodafone Cash
              </label>
            </div>

            <div className="modal_buttons">
              <button
                className="cancel_btn"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>

              <button className="confirm_btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
