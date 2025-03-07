const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Extraemos el token

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token" });
  }

  try {
    console.log("Token recibido:", token); // Verifica que el token se esté recibiendo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = {verificarToken};

