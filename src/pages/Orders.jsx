import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      "https://ecommerce-app-backend-8hnf.onrender.com/api/orders/myorders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data);
  };

  return (
    <div
      style={{
        width: "800px",
        margin: "auto",
      }}
    >
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "20px",
            padding: "15px",
          }}
        >
          <h3>
            Order #
            {order._id.slice(-6)}
          </h3>

          <p>
            Amount:
            ₹{order.totalAmount}
          </p>

          <p>
            Status:
            <strong>
              {" "}
              {order.status}
            </strong>
          </p>

          <p>
            Payment:
            {order.paymentMethod}
          </p>

          <p>
            Address:
            {order.address}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;