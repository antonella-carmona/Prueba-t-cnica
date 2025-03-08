//Define las funciones que manejan las peticiones y responden con datos.

const pool = require("../config/db");


const createAlumno = async (req, res) => {
  const { nombre, apellido, correo, fecha_nacimiento } = req.body;

  if (!nombre || !apellido || !correo || !fecha_nacimiento) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  // Verificar si el correo ya existe
  const existingUser = await pool.query("SELECT * FROM alumnos WHERE correo = $1", [correo]);
  if (existingUser.rows.length > 0) {
    return res.status(400).json({ error: "El correo ya está registrado" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO alumnos (nombre, apellido, correo, fecha_nacimiento) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, apellido, correo, fecha_nacimiento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear alumno" });
  }
};


// Listar todos los alumnos
const getAllAlumnos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alumnos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
};

// Actualizar un alumno
const updateAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, fecha_nacimiento } = req.body;

  try {
    const result = await pool.query(
      "UPDATE alumnos SET nombre = $1, apellido = $2, correo = $3, fecha_nacimiento = $4 WHERE id = $5 RETURNING *",
      [nombre, apellido, correo, fecha_nacimiento, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar alumno" });
  }
};

// Eliminar un alumno
const deleteAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM alumnos WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    res.status(200).json({ message: "Alumno eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar alumno" });
  }
};

module.exports = {
  createAlumno,
  getAllAlumnos,
  updateAlumno,
  deleteAlumno,
};
