import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Main from "./components/Main.jsx";
import MainAlumnos from "./components/containerAlumnos/MainAlumnos.jsx";
import Alumnos from "./components/containerAlumnos/Alumnos.jsx";
import PostAlumnos from "./components/containerAlumnos/PostAlumnos.jsx";
import EditAlumnos from "./components/containerAlumnos/EditAlumnos.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/alumnos"
          element={<PrivateRoute element={<MainAlumnos />} />} // Aquí usamos PrivateRoute
        />
        <Route
          path="/todos_los_alumnos"
          element={<PrivateRoute element={<Alumnos />} />} // Aquí usamos PrivateRoute
        />
        <Route
          path="/alta_alumnos"
          element={<PrivateRoute element={<PostAlumnos />} />} // Aquí usamos PrivateRoute
        />
        <Route
          path="/editar_alumnos/:id"
          element={<PrivateRoute element={<EditAlumnos />} />} // Aquí usamos PrivateRoute
        />
      </Routes>
    </Router>
  );
}

export default App;

