import { Navigate,Outlet } from "react-router-dom"
import HeaderMenuBar from "./HeaderMenuBar"
import useAuth from '../../hooks/useAuth';

export const PrivateLayout = () => {

    const { auth, loading } = useAuth();
    if (loading) {
        return <h1>Cargando...</h1>
    } else {
        return (
            <>
                <HeaderMenuBar />
                {auth.tipo_usuario== 'Admin' ?
                    <Outlet />
                    :
                    <Navigate to="/admin/login" />
                }
            
            </>
        )
    }
}
