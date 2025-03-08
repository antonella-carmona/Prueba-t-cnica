import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const PostAlumnos = () => {
   const [correo, setCorreo] = useState("");
   const [nombre, setNombre] = useState("");
   const [apellido, setApellido] = useState("");
   const [fecha_nacimiento, setFechaNacimiento] = useState("");
   const { auth } = useAuth();
   const [alumnos, setAlumnos] = useState([]);
   const [showPopup, setShowPopup] = useState(false);

    const crearAlumno = async (nuevoAlumno) => {
      try {
        const response = await fetch("http://localhost:3000/alumnos", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoAlumno),
        });

        if (!response.ok) {
          console.error("Error al crear el alumno:", response.status);
          return;
        }

        const data = await response.json();
        setAlumnos([...alumnos, data]); // Agrega el nuevo alumno a la lista
        // Mostrar el popup de éxito
        setShowPopup(true);

        // Cerrar el popup después de 3 segundos
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoAlumno = {
      nombre,
      apellido,
      correo,
      fecha_nacimiento,
    };

    crearAlumno(nuevoAlumno);

    // Resetear campos del formulario después de enviar
    setNombre("");
    setApellido("");
    setCorreo("");
    setFechaNacimiento("");
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
      <Link to="/alumnos">
        <span>Inicio</span>
      </Link>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "white",
        }}
      >
        Alta de alumno
      </p>

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
            Cargar alumno
          </button>
        </div>
      </form>
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
          ¡Alumno cargado exitosamente!
        </div>
      )}
    </div>
  );
};

export default PostAlumnos;
