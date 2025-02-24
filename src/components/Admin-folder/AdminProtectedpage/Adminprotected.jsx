
import { Navigate, Outlet } from "react-router-dom";

const Adminprotected = () => {
    const isAdmin = localStorage.getItem("adminToken"); // Check for admin token

    return isAdmin ? <Outlet /> : <Navigate to="/adminlogin" replace />;
};

export default Adminprotected;
