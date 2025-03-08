import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element}) => {

  const token = localStorage.getItem("token"); // Verifica si hay un token almacenado
 console.log("ggggggggggggg", token);
  const isAuthenticated = !!token; // Convierte el token en un booleano

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;

