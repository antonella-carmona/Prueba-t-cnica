const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db"); // Importamos la conexión a la base de datos

const app = express();


app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(cors()); // Habilita CORS

// Rutas
app.use("/", require("./routes/alumnosRoutes"));
app.use("/", require("./routes/authRoutes"));


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});