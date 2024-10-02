import { useState } from "react";
import { Global } from "../../helpers/Global"; // Ajusta esta ruta según la ubicación de tu archivo de configuración global
import { useNavigate } from "react-router-dom";

const CrearExamen = () => {
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        fecha_limite: "",
        estado: true, // Valor por defecto para el estado
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("usuario"));

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!form.titulo || !form.descripcion || !form.fecha_limite || !form.estado) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {

            setForm({
                ...form,
                id_usuario: user.id_usuario,
            });
            

            console.log(JSON.stringify(form));


            // Petición POST al backend para crear el examen
            const response = await fetch(`${Global.url}Examenes/IngresarExamen`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(form).replace("activo", true).replace("inactivo", false),
            });

            const data = await response.json();
            console.log(data);

            if (response.status === 201 || data.status === "success") {
                setSuccess("Examen creado con éxito.");
                // Redireccionar o limpiar el formulario después de la creación
                navigate("/examenes"); // Ajusta la ruta a la página de exámenes si es necesario
            } else {
                setError("Ocurrió un error al crear el examen.");
            }
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Error en la petición. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Crear Nuevo Examen</h3>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="titulo">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        name="titulo"
                                        placeholder="Título del examen"
                                        value={form.titulo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="descripcion"
                                        name="descripcion"
                                        placeholder="Descripción del examen"
                                        value={form.descripcion}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="cantidad_preguntas">Cantidad preguntas</label>
                                    <input
                                        type="number<s"
                                        className="form-control"
                                        id="cantidad_preguntas"
                                        name="cantidad_preguntas"
                                        placeholder="0"
                                        value={form.cantidad_preguntas}
                                        onChange={handleChange}

                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="fecha_limite">Fecha Límite</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fecha_limite"
                                        name="fecha_limite"
                                        value={form.fecha_limite}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="estado">Estado</label>
                                    <select
                                        className="form-control"
                                        id="estado"
                                        name="estado"
                                        value={form.estado}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="true">Activo</option>
                                        <option value="false">Inactivo</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Crear Examen
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearExamen;
