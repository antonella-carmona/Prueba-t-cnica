import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditAlumnos = () => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  // Obtener el ID del alumno desde los parámetros de la URL
  const { id } = useParams();
   const navigate = useNavigate();
console.log("id", id);
  useEffect(() => {
    // Función para cargar los datos del alumno por ID
    const cargarAlumno = async () => {
      try {
        const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) {
          console.error(
            "Error al cargar los datos del alumno:",
            response.status
          );
          return;
        }
        const data = await response.json();
        setNombre(data.nombre);
        setApellido(data.apellido);
        setCorreo(data.correo);
        setFechaNacimiento(data.fecha_nacimiento);
      } catch (error) {
        console.error("Error en la carga de datos:", error);
      }
    };

    cargarAlumno();
  }, [id, auth.token]);

  const actualizarAlumno = async (updatedAlumno) => {
    try {
      const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
        method: "PUT", // Usamos PUT para actualizar
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAlumno),
      });

      if (!response.ok) {
        console.error("Error al actualizar el alumno:", response.status);
        return;
      }

      const data = await response.json();
      setShowPopup(true);

      // Redirigir a la lista de alumnos después de unos segundos
      setTimeout(() => {
        setShowPopup(false);
        // history.push("/todos_los_alumnos"); // Redirige a la lista de alumnos
        navigate("/todos_los_alumnos");
      }, 3000);
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

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
