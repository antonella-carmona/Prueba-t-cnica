// Conexión a la base de datos
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("🟢 Conectado a la base de datos"))
  .catch((err) =>
    console.error("🔴 Error al conectar a la base de datos", err)
  );

module.exports = pool;
