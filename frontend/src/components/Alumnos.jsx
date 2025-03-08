import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Alumnos = () => {
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
      <Link to="/">
        <span>Inicio</span>
      </Link>
      <h1>Alumnos</h1>
      <ul>
        {alumnos?.map((alumno) => (
          
          <React.Fragment key={alumno?.id}>
            <li key={`nombre-${alumno.id}`}>Nombre: {alumno?.nombre}</li>
            <li key={`apellido-${alumno.id}`}>Apellido: {alumno?.apellido}</li>
            <li key={`correo-${alumno.id}`}>Correo: {alumno?.correo}</li>
            <li key={`fecha-${alumno.id}`}>
              Fecha de nacimiento: {alumno?.fecha_nacimiento}
            </li>
            <hr />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Alumnos;
