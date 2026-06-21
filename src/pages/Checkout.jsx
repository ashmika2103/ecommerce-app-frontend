import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const placeOrder = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://ecommerce-app-backend-8hnf.onrender.com/api/orders",
        {
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: 1,
          })),

          totalAmount,

          address,
          phone,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Order Placed Successfully"
      );

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert("Failed to place order");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
      }}
    >
      <h1>Checkout</h1>

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <option>
          Cash On Delivery
        </option>

        <option>
          UPI
        </option>

        <option>
          Card
        </option>
      </select>

      <h2>
        Total Amount: ₹{totalAmount}
      </h2>

      <button
        onClick={placeOrder}
        style={{
          padding: "12px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;