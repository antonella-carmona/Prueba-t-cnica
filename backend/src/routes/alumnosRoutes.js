// routes/alumnos.js
const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnosControllers.js");
const {verificarToken} = require("../middleware/authMiddleware.js");


// Rutas protegidas con JWT
router.post("/alumnos", verificarToken, alumnosController.createAlumno); 
router.get("/alumnos", verificarToken, alumnosController.getAllAlumnos); 
router.put("/alumnos/:id", verificarToken, alumnosController.updateAlumno); 
router.delete("/alumnos/:id", verificarToken, alumnosController.deleteAlumno); 

module.exports = router;
