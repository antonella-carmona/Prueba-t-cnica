import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element}) => {

  const token = localStorage.getItem("token"); // Verifica si hay un token almacenado

  const isAuthenticated = !!token; // Convierte el token en un booleano

  return isAuthenticated ? element : <Navigate to="/register" replace />;
};

export default PrivateRoute;

