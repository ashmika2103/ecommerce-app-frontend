import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-app-backend-8hnf.onrender.com/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
    marginBottom: "20px",
    color: "#1e293b",
    fontSize: "42px",
  }}
>
  E-Commerce Store
</h1>

      <Link to="/cart">
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "30px",
          }}
        >
          Go To Cart
        </button>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h2 style={{ marginTop: "15px" }}>
              {product.name}
            </h2>

            <p>{product.description}</p>

            <h3>₹{product.price}</h3>

            <p>Stock: {product.stock}</p>

            <button
              onClick={() => {
                addToCart(product);
                alert("Added to cart");
              }}
              style={{
                padding: "10px 20px",
                border: "none",
                backgroundColor: "#16a34a",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;