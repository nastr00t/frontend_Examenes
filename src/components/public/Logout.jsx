import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Logout = () => {

    // Se reciben los métodos setAuth y SetCounters
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        // Vaciar el local storage
        localStorage.clear();

        // Setear estados globales a vacío
        setAuth({});

        // Navigate (redirección) al login
        navigate("/admin/login");

    });

    return (
        <h1>Cerrando sesión...</h1>
    )
}
