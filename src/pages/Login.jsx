import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ecommerce-app-backend-8hnf.onrender.com/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // ✅ SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // ✅ SAVE USER (IMPORTANT FIX)
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Optional (you already had)
      localStorage.setItem(
        "role",
        res.data.user.role
      );

      localStorage.setItem(
        "userId",
        res.data.user.id
      );

      if (res.data.user.role === "admin") {
        alert("Admin Login Successful");
        navigate("/admin");
      } else {
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div style={container}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
}

const container = {
  maxWidth: "500px",
  margin: "60px auto",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Login;