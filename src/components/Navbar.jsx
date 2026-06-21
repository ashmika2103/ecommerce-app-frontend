import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);

    alert("Logged Out Successfully");
    navigate("/login");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>

      <Link to="/cart" style={linkStyle}>
        Cart
      </Link>

      <Link to="/orders" style={linkStyle}>
        Orders
      </Link>

      {/* USER INFO DISPLAY */}
      {token && user && (
        <span style={{ color: "white" }}>
          👤 {user.name} ({user.role})
        </span>
      )}

      {/* BEFORE LOGIN */}
      {!token && (
        <>
          <Link
            to="/login"
            style={linkStyle}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={linkStyle}
          >
            Register
          </Link>
        </>
      )}

      {/* AFTER LOGIN */}
      {token && (
        <button
          onClick={handleLogout}
          style={logoutStyle}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

const navStyle = {
  backgroundColor: "#1e293b",
  padding: "15px 30px",
  display: "flex",
  justifyContent: "center",
  gap: "35px",
  alignItems: "center",
};

const logoutStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Navbar;