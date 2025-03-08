import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar el hook useNavigate

const MainAlumnos = () => {
  const navigate = useNavigate(); // Hook para la redirección

  const handleRedirigirAlumnos = () => {
    navigate("/todos_los_alumnos"); // Redirige a la vista de Alumnos
  };

  const handleRedirigirAlta = () => {
    navigate("/alta_alumnos"); // Redirige a la vista de Alta Alumnos
  };

  const handleRedirigirEditar = () => {
    navigate("/editar_alumnos/:id"); // Redirige a la vista de Editar Alumnos
  };

  const handleRedirigirEliminar = () => {
    navigate("/eliminar-alumnos"); // Redirige a la vista de Eliminar Alumnos
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
        color: "white",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Link to="/" style={{ right: "0px"}}>
        <span>Inicio</span>
      </Link>
      <h2
        style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "bold" }}
      >
        Gestión de Alumnos
      </h2>

      <button
        onClick={handleRedirigirAlumnos} // Redirige a la vista de todos los alumnos
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "8px",
          backgroundColor: "#007BFF",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Todos los alumnos
      </button>

      <button
        onClick={handleRedirigirAlta} // Redirige a la vista de alta de alumnos
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "8px",
          backgroundColor: "#28A745",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Alta alumnos
      </button>

      <button
        onClick={handleRedirigirEditar} // Redirige a la vista de editar alumnos
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "8px",
          backgroundColor: "#FFC107",
          border: "none",
          borderRadius: "5px",
          color: "black",
          cursor: "pointer",
        }}
      >
        Editar alumnos
      </button>

      <button
        onClick={handleRedirigirEliminar} // Redirige a la vista de eliminar alumnos
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#DC3545",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Eliminar alumnos
      </button>
    </div>
  );
};

export default MainAlumnos;
