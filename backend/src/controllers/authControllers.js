// const pool = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//   const { email, contraseña } = req.body;



//   if (!email || !contraseña) {
//     return res
//       .status(400)
//       .json({ message: "Email y contraseña son requeridos" });
//   }

//   try {
//     const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
//       email,
//     ]);

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: "Usuario no encontrado" });
//     }

//     const usuario = result.rows[0];
//     console.log("que tengo en usuario ", usuario);

//     const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
//     if (!esValida) {
//       return res.status(401).json({ message: "Contraseña incorrecta" });
//     }

//     const token = jwt.sign(
//       { id: usuario.id, email: usuario.email },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error("Error en login:", error);
//     res.status(500).json({ message: "Error en el servidor" });
//   }
// };

// module.exports = { login };

// ------------------------------------------
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRO DE USUARIO
const register = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  try {
    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    await pool.query(
      "INSERT INTO usuarios (email, contraseña) VALUES ($1, $2)",
      [email, hash]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Usuario existente, debe hacer login" });
  }
};

// LOGIN DE USUARIO
const login = async (req, res) => {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const usuario = result.rows[0];
    console.log("que tengo en usuario ", usuario);

    // Comparar la contraseña encriptada
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { register, login };

