import { Global } from "../../helpers/Global";
import examen from '../../assets/examen.png';
import { useForm } from "../../hooks/setForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2"; 


export const Registro = () => {
    const { form, changed } = useForm({});
    // Estado para mostrar resultado del registro del user
    const [saved, setSaved] = useState("not sended");
    // Hook para redirigir
    const navigate = useNavigate();
    // Guardar un usuario en la BD
    const saveUser = async (e) => {
        // Prevenir que se actualice la pantalla
        e.preventDefault();

        // Obtener los datos del formulario
        let newUser = form;

        // Petición a la API del Backend para guardar usuario en la BD
        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Obtener la información retornada por la request
        const data = await request.json();

        // Verificar si el estado de la respuesta del backend es "created" seteamos la variable saved con "saved" y si no, le asignamos "error", esto es para mostrar por pantalla el resultado del registro del usuario
        if (request.status === 201 && data.status === "created") {
            setSaved("saved");

            // Mostrar modal de éxito
            Swal.fire({
                title: data.message,
                icon: "success",
                confirmButtonText: "Continuar",
            }).then(() => {
                // Redirigir después de cerrar el modal
                navigate("/login");
            });
        } else {
            setSaved("error");

            // Mostrar modal de error
            Swal.fire({
                title: data.message || "¡Error en el registro!",
                icon: "error",
                confirmButtonText: "Intentar nuevamente",
            });
        }
    };
    return (
        <section className="vh-100" >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registro Evaluados</p>
                                        {/* Respuestas de usuario registrado*/}
                                        {saved == "saved" && (
                                            <strong className="alert alert-success">
                                                ¡Usuario registrado correctamente!
                                            </strong>
                                        )}
                                        {saved == "error" && (
                                            <strong className="alert alert-danger">
                                                ¡El usuario no se ha registrado!
                                            </strong>
                                        )}

                                        <form className="mx-1 mx-md-4" onSubmit={saveUser}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="documentoIdentidad"  >Documento Identificación:</label>
                                                    <input type="text"
                                                        id="documentoIdentidad"
                                                        className="form-control"
                                                        onChange={changed}
                                                        value={form.documentoIdentidad || ""}
                                                        autoComplete="" />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="nombres" >Nombres:</label>
                                                    <input type="text"
                                                        id="nombres"
                                                        className="form-control"
                                                        onChange={changed}
                                                        value={form.nombres || ""}
                                                        autoComplete="given-name" />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="nombres"  >Apellidos:</label>
                                                    <input type="text"
                                                        id="apellidos"
                                                        className="form-control"
                                                        onChange={changed}
                                                        value={form.apellidos || ""}
                                                        autoComplete="family-name" />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="cargo" >Cargo:</label>
                                                    <input type="text" id="cargo"
                                                        className="form-control"
                                                        onChange={changed}
                                                        value={form.cargo || ""}
                                                        autoComplete="" />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="text" id="ciudad" className="form-control"
                                                        onChange={changed}
                                                        value={form.ciudad || ""}
                                                        autoComplete="" />
                                                    <label className="form-label" >Ciudad:</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="correo">Correo</label>
                                                    <input type="email"
                                                        id="correo"
                                                        className="form-control"
                                                        onChange={changed}
                                                        value={form.correo || ""}
                                                        autoComplete="given-name" />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="button" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-primary btn-lg">Registrar</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src={examen}
                                            className="img-fluid" alt="registro" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
