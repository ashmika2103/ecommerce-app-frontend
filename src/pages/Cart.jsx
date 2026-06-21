import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          color: "#1e293b",
        }}
      >
        Shopping Cart
      </h1>

      <Link to="/">
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "30px",
            fontSize: "16px",
          }}
        >
          Back To Home
        </button>
      </Link>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "25px",
                margin: "20px auto",
                width: "350px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  display: "block",
                  margin: "0 auto",
                }}
              />

              <h2 style={{ marginTop: "15px" }}>
                {item.name}
              </h2>

              <p>{item.description}</p>

              <h3>₹{item.price}</h3>

              <p>Stock: {item.stock}</p>
            </div>
          ))}

          <h2
            style={{
              color: "#16a34a",
              marginTop: "20px",
            }}
          >
            Total: ₹{totalPrice}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "12px 25px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px",
              fontSize: "16px",
            }}
          >
            Proceed To Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;