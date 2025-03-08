import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ButtonDeleteIcon, ButtonEdit } from "../../assets/GlobalIcons";
import EditAlumnos from "./EditAlumnos.jsx";


const Alumnos = () => {
  const [editAlumno, setEditAlumno] = useState(false);
  const [alumnoId, setAlumnoId] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const { auth } = useAuth();

  console.log("auth?.token es el token :", auth?.token);

  useEffect(() => {
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

    fetchAlumnos();
  }, [auth?.token]);

  const handleEdit = (id) => {
    // Lógica de edición
    setEditAlumno(true)
    setAlumnoId(id)
    console.log(`Editar alumno con id ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica de eliminación
    console.log(`Eliminar alumno con id ${id}`);
  };

  return (
    // <div
    //   style={{
    //     maxWidth: "400px",
    //     margin: "0 auto",
    //     padding: "16px",
    //     border: "1px solid #ddd",
    //     borderRadius: "8px",
    //     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    //     backgroundColor: "#1a1f3e",
    //     width: "100%",
    //     color: "white",
    //   }}
    // >
    //   <Link to="/alumnos">
    //     <span>Inicio</span>
    //   </Link>
    //   <h1>Alumnos</h1>
    //   <div style={{ maxHeight: "300px", overflowY: "auto" }}>
    //     <ul>
    //       {alumnos?.map((alumno) => (
    //         <React.Fragment key={alumno?.id}>
    //           <span
    //             onClick={() => handleEdit(alumno.id)}
    //             style={{ marginLeft: "10px", cursor: "pointer" }}
    //           >
    //             <ButtonEdit />
    //           </span>
    //           <span
    //             onClick={() => handleDelete(alumno.id)}
    //             style={{ marginLeft: "5px", cursor: "pointer" }}
    //           >
    //             <ButtonDeleteIcon />
    //           </span>
    //           <li key={`nombre-${alumno.id}`}>Nombre: {alumno?.nombre}</li>
    //           <li key={`apellido-${alumno.id}`}>
    //             Apellido: {alumno?.apellido}
    //           </li>
    //           <li key={`correo-${alumno.id}`}>Correo: {alumno?.correo}</li>
    //           <li key={`fecha-${alumno.id}`}>
    //             Fecha de nacimiento: {alumno?.fecha_nacimiento}
    //           </li>
    //           <hr />
    //         </React.Fragment>
    //       ))}
    //     </ul>
    //   </div>
    //   {editAlumno && <EditAlumnos id={alumnoId}/>}
    // </div>

    <div
      style={{
        maxWidth: "800px", // Ajusta el tamaño máximo del contenedor
        margin: "0 auto",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#1a1f3e",
        width: "100%",
        color: "white",
        display: "flex", // Usamos flexbox para disponer los elementos lado a lado
        flexDirection: "row", // Elementos en fila (horizontal)
        gap: "16px", // Espacio entre los elementos
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
                onClick={() => handleEdit(alumno.id)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <ButtonEdit />
              </span>
              <span
                onClick={() => handleDelete(alumno.id)}
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
          <EditAlumnos id={alumnoId} />
        </div>
      )}
    </div>
  );
};

export default Alumnos;
