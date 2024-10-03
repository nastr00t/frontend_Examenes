import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Global } from "../../helpers/Global";

const Login = () => {
    const [login, setLogin] = useState("");
    const [pass, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!login || !pass) {
            setError("Todos los campos son obligatorios");
            return;
        }

        const loginAccess = {
            username: login,  // Ya no usamos this
            password: pass    // Ya no usamos this
        };

        try {
            const response = await fetch(`${Global.url}Usuarios/validarUsuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginAccess),
            });

            // Obtener la información retornada por la request
            const data = await response.json();
            //console.log(data);

            // Verificar si el estado de la respuesta es correcto
            if (response.status === 200 && data.status === "success") {
                // Guardar los datos del token y usuario en el localstorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                setAuth(data.usuario);

                // Navegar a la página de inicio
                navigate("/admin/examenes");
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setError("Ocurrió un error al intentar iniciar sesión");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="login">Usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="login"
                                        placeholder="Usuario"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}  // Renombrado
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Contraseña"
                                        value={pass}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary bg-dark w-100">
                                    Iniciar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
