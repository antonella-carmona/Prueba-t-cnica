import React from "react";
import { Link } from "react-router-dom";
import { IconLogout } from "../assets/GlobalIcons";

const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/register" style={styles.navItem}>
          <button style={styles.menuButton}>Register</button>
        </Link>
        <Link to="/login" style={styles.navItem}>
          <button style={styles.menuButton}>Login</button>
        </Link>
        <Link to="/alumnos" style={styles.navItem}>
          <button style={styles.menuButton}>Alumnos</button>
        </Link>

        <Link to="/Login" style={styles.navItem}>
          <IconLogout />
        </Link>
      </nav>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "flex-end", // Alinea los botones a la derecha
    alignItems: "center", // Centra verticalmente
    backgroundColor: "#1a1f3e",
    padding: "15px 0",
    width: "100%", // Asegura que la navbar ocupe todo el ancho
    position: "fixed", // Fija la navbar al principio de la página
    top: 0,
    left: 0,
    zIndex: 10, // Asegura que la navbar esté por encima de otros elementos
  },
  navItem: {
    margin: "0 15px", // Espacio entre los botones
  },
  menuButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    border: "2px solid #242424",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};

export default Main;

