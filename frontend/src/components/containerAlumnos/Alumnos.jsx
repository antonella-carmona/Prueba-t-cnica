import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ButtonDeleteIcon, ButtonEdit } from "../../assets/GlobalIcons";
import EditAlumnos from "./EditAlumnos.jsx";


const Alumnos = () => {
  const [editAlumno, setEditAlumno] = useState(false);
  const [alumnoObject, setAlumnoObject] = useState(null);
  const [alumnos, setAlumnos] = useState([]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);
  const { auth } = useAuth();

  
const fetchAlumnos = async () => {
  if (!auth?.token) return; // No hacer la petición si el token no está cargado

  try {
    const response = await fetch("http://localhost:3000/alumnos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error al obtener alumnos:", response.status);
      return;
    }

    const data = await response.json();
    console.log("data alumnos:", data);
    setAlumnos(data);
  } catch (error) {
    console.error("Error en la petición:", error);
  }
};
  useEffect(() => {
    

    fetchAlumnos();
  }, [auth?.token]);

  const handleEdit = (alumno) => {
    setEditAlumno(true)
    setAlumnoObject(alumno);
  };

  // const handleDelete = (id) => {
  //   // Lógica de eliminación
  //   console.log(`Eliminar alumno con id ${id}`);
  // };
   const handleDeleteClick = (id) => {
     setAlumnoToDelete(id);
     setShowDeletePopup(true); // Mostrar el popup de confirmación
   };

    const eliminarAlumno = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/alumnos/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          console.error("Error al eliminar el alumno:", response.status);
          return;
        }

        setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
        setShowDeletePopup(false); // Cerrar el popup después de eliminar
        alert("Alumno eliminado exitosamente");
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    const handleCancelDelete = () => {
      setShowDeletePopup(false); // Cerrar el popup sin eliminar
    };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#1a1f3e",
        width: "100%",
        color: "white",
        display: "flex", 
        flexDirection: "row", 
        gap: "16px", 
      }}
    >
      <div style={{ flex: 1, maxHeight: "300px", overflowY: "auto" }}>
        <Link to="/alumnos">
          <span>Inicio</span>
        </Link>
        <h1>Alumnos</h1>
        <ul>
          {alumnos?.map((alumno) => (
            <React.Fragment key={alumno?.id}>
              <span
                onClick={() => handleEdit(alumno)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <ButtonEdit />
              </span>
              <span
                onClick={() => handleDeleteClick(alumno.id)}
                style={{ marginLeft: "5px", cursor: "pointer" }}
              >
                <ButtonDeleteIcon />
              </span>
              <li key={`nombre-${alumno.id}`}>Nombre: {alumno?.nombre}</li>
              <li key={`apellido-${alumno.id}`}>
                Apellido: {alumno?.apellido}
              </li>
              <li key={`correo-${alumno.id}`}>Correo: {alumno?.correo}</li>
              <li key={`fecha-${alumno.id}`}>
                Fecha de nacimiento: {alumno?.fecha_nacimiento}
              </li>
              <hr />
            </React.Fragment>
          ))}
        </ul>
      </div>
      {editAlumno && (
        <div style={{ flex: 1 }}>
          <EditAlumnos
            alumnoObject={alumnoObject}
            id={alumnoObject?.id}
            close={setEditAlumno}
            refetchAlumnos={fetchAlumnos}
          />
        </div>
      )}

      {showDeletePopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#1a1f3e",
            borderRadius: "8px",
            boxShadow: "6px 6px 6px 6px rgb(2, 0, 5)",
            border: "1px solid #ddd",
          }}
        >
          <h3>¿Estás seguro de que quieres eliminar este alumno?</h3>
          <button onClick={() => eliminarAlumno(alumnoToDelete)}
            style={{ padding: "10px 20px",  cursor: "pointer" , marginRight: "10px"}}>
            Confirmar
          </button>
          <button onClick={handleCancelDelete}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Alumnos;
