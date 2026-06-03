import { useEffect, useState, useRef } from "react";
import PageTransition from "../../compontents/PageTransition";
import "./Order.css";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/react";
import { useLocation } from "react-router-dom";
export default function Orders() {
  const { user } = useUser();


  // ! Use Location
  const { state } = useLocation();
  const orderRefs = useRef({});
  //! Stete Orders
  const [orders, setOrders] = useState([]);

useEffect(() => {
  if (!user) return;

  const savedOrders =
    JSON.parse(
      localStorage.getItem(`orders_${user.id}`)
    ) || [];

  setOrders(savedOrders.reverse());
}, [user]);

  //  ! Latest Order
  useEffect(() => {
    if (state?.lastOrderId && orders.length > 0) {
      const element = orderRefs.current[state.lastOrderId];

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.classList.add("active-order");

        setTimeout(() => {
          element.classList.remove("active-order");
        }, 3000);
      }
    }
  }, [state, orders]);
  //! clerk
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <PageTransition>
      <div className="container">
        <div className="top_slide">
          <h2>My Orders</h2>
        </div>

        {orders.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              ref={(el) => (orderRefs.current[order.id] = el)}
              className="order_card"
            >
              <h3>
                Order #{order.id}
                {orders[0]?.id === order.id && (
                  <span className="new_badge">Latest Order</span>
                )}
              </h3>

              <p>Date: {order.date}</p>

              <p>Payment: {order.paymentMethod}</p>

              <p>
                Total:
                <strong>${order.total}</strong>
              </p>

              <div className="order_items">
                {order.items.map((item) => (
                  <div key={item.id} className="order_item">
                    <img src={item.images[0]} alt={item.title} />

                    <span>{item.title}</span>

                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
