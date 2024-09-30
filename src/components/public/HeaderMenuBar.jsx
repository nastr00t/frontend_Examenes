import { NavLink } from "react-router-dom"
import logo from '../../assets/logo_estudiantes.png';

function HeaderMenuBar() {


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
                            <li><NavLink to='/admin/login' className="nav-link px-2 text-white">

                                <span className="nav-link px-2 text-white">Admin</span>
                            </NavLink> </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}
export default HeaderMenuBar;
