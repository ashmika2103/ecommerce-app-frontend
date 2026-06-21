import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderRes = await axios.get(
        "https://ecommerce-app-backend-8hnf.onrender.com/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productRes = await axios.get(
        "https://ecommerce-app-backend-8hnf.onrender.com/api/products"
      );

      setOrders(orderRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={container}>
      <h1>Admin Dashboard</h1>

      {/* STATS */}
      <div style={statsBox}>
        <div style={card}>
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div style={card}>
          <h3>Total Orders</h3>
          <h2>{orders.length}</h2>
        </div>
      </div>

      <hr />

      {/* BUTTONS */}
      <div style={buttonBox}>
        <button onClick={() => navigate("/admin/products")}>
          Manage Products
        </button>

        <button onClick={() => navigate("/admin/orders")}>
          Manage Orders
        </button>

        <button onClick={() => navigate("/checkout")}>
          Go to Store
        </button>
      </div>
    </div>
  );
}

const container = {
  padding: "20px",
  textAlign: "center",
};

const statsBox = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  margin: "20px 0",
};

const card = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "150px",
};

const buttonBox = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "200px",
  margin: "auto",
};

export default AdminDashboard;