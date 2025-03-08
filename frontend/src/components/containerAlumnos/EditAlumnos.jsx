import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ButtonCloseIcon } from "../../assets/GlobalIcons";

const EditAlumnos = ({ alumnoObject, id, close, refetchAlumnos }) => {
  const [correo, setCorreo] = useState(alumnoObject?.correo);
  const [nombre, setNombre] = useState(alumnoObject?.nombre);
  const [apellido, setApellido] = useState(alumnoObject?.apellido);
  // const [fecha_nacimiento, setFechaNacimiento] = useState(alumnoObject?.fecha_nacimiento);
  const [fecha_nacimiento, setFechaNacimiento] = useState(
    alumnoObject?.fecha_nacimiento
      ? alumnoObject.fecha_nacimiento.split("T")[0]
      : ""
  );
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  console.log("alumnoObject", alumnoObject);
  console.log("id", id);


  const actualizarAlumno = async (alumnoObject) => {
    try {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "PUT", // Usamos PUT para actualizar
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alumnoObject),
      });

      if (!response.ok) {
        console.error("Error al actualizar el alumno:", response.status);
        return;
      }

      const data = await response.json();
      console.log("dataaaaaaaaaaaaaaa chavo:", data);
      setShowPopup(true);

      
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      refetchAlumnos()
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  useEffect(() => {
    setCorreo(alumnoObject?.correo);
    setNombre(alumnoObject?.nombre);
    setApellido(alumnoObject?.apellido);
    setFechaNacimiento(
      alumnoObject?.fecha_nacimiento
        ? alumnoObject.fecha_nacimiento.split("T")[0]
        : ""
    );
    
  }, [alumnoObject]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAlumno = {
      nombre,
      apellido,
      correo,
      fecha_nacimiento,
    };

    actualizarAlumno(updatedAlumno);
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
      <span
        onClick={() => close(false)}
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        <ButtonCloseIcon />
      </span>
      <h2 style={{ color: "white", textAlign: "center" }}>Editar Alumno</h2>

      {/* Popup de éxito */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            zIndex: 999,
          }}
        >
          ¡Alumno actualizado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            required
            style={{
              padding: "12px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            required
            style={{
              padding: "12px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            placeholder="Fecha nacimiento"
            required
            style={{
              padding: "12px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            required
            style={{
              padding: "12px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
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
              boxSizing: "border-box",
            }}
          >
            Actualizar Alumno
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAlumnos;
