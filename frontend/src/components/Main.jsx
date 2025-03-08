import React from "react";
import { Link } from "react-router-dom";

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
      </nav>

     
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center", // Centra los botones horizontalmente
    alignItems: "center", // Centra verticalmente
    backgroundColor: "#4a90e2",
    padding: "15px 0",
    width: "100%", // Asegura que la navbar ocupe todo el ancho
  
  },
  navItem: {
    margin: "0 15px", // Espacio entre los botones
  },
  menuButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    color: "#4a90e2",
    border: "2px solid #4a90e2",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
  },

};

export default Main;
