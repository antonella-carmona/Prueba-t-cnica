const express = require("express");
const { login, register } = require("../controllers/authControllers");


const router = express.Router();

// Ruta para login
router.post("/login", login);
// Ruta para registro
router.post("/register", register);

module.exports = router;
