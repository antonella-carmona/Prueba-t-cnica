import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contraseña }),
      });
    
      const data = await response.json();
   
      if (data?.token) {
        localStorage.setItem("token", data.token); // Guarda el token en localStorage
        login(data?.token); // Almacena el token en el contexto
        navigate("/alumnos"); // Redirige a la página de alumnos
      } else {
        alert("Usuario no encontrado. Debes registrarte");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#1a1f3e",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          to="/"
          style={{ fontSize: "15px",  }}
        >
          <span>Menu</span>
        </Link>
        <Link
          to="/register"
          style={{ fontSize: "15px", }}
        >
          <span>Register</span>
        </Link>
      </div>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "white",
        }}
      >
        Login
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              padding: "12px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box", // Asegura que el tamaño del input no sobresalga
            }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Password"
            required
            style={{
              padding: "12px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box", // Asegura que el tamaño del input no sobresalga
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              backgroundColor: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
              boxSizing: "border-box", // Asegura que el tamaño del botón no sobresalga
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
