import { NavLink } from "react-router-dom"
import logo from '../../assets/logo_estudiantes.png';
import useAuth from '../../hooks/useAuth';

function HeaderMenuBar() {

    // Usamos el hook Auth para tener disponible el objeto del usuario identificado.
    const { auth } = useAuth();


    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img src={logo} alt="Examen Conductores" />
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li> <NavLink to='/' className="nav-link px-2 text-white">
                                <span className="nav-link px-2 text-white">Home</span>
                            </NavLink></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white p-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Examen
                                </a>
                                <ul className="dropdown-menu bg-dark">
                                    <li><NavLink to='/admin/examenes' className="nav-link px-2 text-white">
                                        <span className="nav-link px-2 text-white">Examenes</span>
                                    </NavLink> </li>
                                    <li><NavLink to='/admin/crearExamen' className="nav-link px-2 text-white">
                                        <span className="nav-link px-2 text-white">Crear examen</span>
                                    </NavLink> </li>
                                    <li><hr className="dropdown-divider" /></li>
                                </ul>
                            </li>
                            <li><NavLink to='/admin/categorias' className="nav-link px-2 text-white">
                                <span className="nav-link px-2 text-white">Categorias</span>
                            </NavLink> </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white p-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Preguntas
                                </a>
                                <ul className="dropdown-menu bg-dark">
                                    <li><NavLink to='/admin/preguntas' className="nav-link px-2 text-white">
                                        <span className="nav-link px-2 text-white">Listar Preguntas</span>
                                    </NavLink> </li>
                                    <li><NavLink to='/admin/crearpregunta' className="nav-link px-2 text-white">
                                        <span className="nav-link px-2 text-white">Crear pregunta</span>
                                    </NavLink> </li>
                                    <li><NavLink to='/admin/cargararchivo' className="nav-link px-2 text-white">
                                        <span className="nav-link px-2 text-white">Cargar Archivo</span>
                                    </NavLink> </li>
                                    <li><hr className="dropdown-divider" /></li>
                                </ul>
                            </li>
                            
                        </ul>
                        <div className="text-end">
                            <span className="navbar-text">
                                {auth.nombre} {auth.apellidos}
                            </span>
                            <NavLink to="/admin/logout" className="btn btn-outline-light m-3 me-2">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <span className="list-end__name">Cerrar sesión</span>
                            </NavLink>
                        </div>
                       
                    </div>
                </div>
            </header>
        </>
    );
}
export default HeaderMenuBar;
