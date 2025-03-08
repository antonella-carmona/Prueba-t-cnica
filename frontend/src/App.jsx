// import './App.css'
// import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import Alumnos from "./components/Alumnos.jsx";
// import Login from "./components/Login.jsx";
// import PrivateRoute from "./utils/PrivateRoute.jsx";
// function App() {
 

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <PrivateRoute path="/alumnos" element={<Alumnos />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Alumnos from "./components/Alumnos.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Main from "./components/Main.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<PrivateRoute element={<Login />} />} /> */}
        <Route
          path="/alumnos"
          element={<PrivateRoute element={<Alumnos />} />} // Aquí usamos PrivateRoute
        />
      </Routes>
    </Router>
  );
}

export default App;

