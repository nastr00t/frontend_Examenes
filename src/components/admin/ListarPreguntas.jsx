import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global"; // Ajusta la ruta según tu archivo de configuración
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ListarPreguntas = () => {
    const [preguntas, setPreguntas] = useState([]); // Estado para las preguntas
    const [error, setError] = useState(""); // Estado para errores
    const [loading, setLoading] = useState(true); // Estado de carga
    const token = localStorage.getItem("token");

    function UnsafeComponent({ html }) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    // Obtener todas las preguntas desde el backend
    useEffect(() => {
        const getPreguntas = async () => {
            try {
                const response = await fetch(`${Global.url}Examenes/ListarPreguntas`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                });

                const data = await response.json();
                if (response.ok && data.status === "success") {
                    setPreguntas(data.preguntas);
                } else {
                    setError("No se pudieron cargar las preguntas.");
                }
            } catch (error) {
                console.error("Error al obtener las preguntas:", error);
                setError("Error al conectarse con el servidor.");
            } finally {
                setLoading(false); // Desactivar el estado de carga
            }
        };

        getPreguntas();
    }, [token]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Listado de Preguntas</h2>

            {/* Mostrar mensaje de error si ocurre */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Mostrar un spinner mientras se cargan las preguntas */}
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {preguntas.length > 0 ? (
                        preguntas.map((pregunta) => (
                            <div key={pregunta.id_pregunta} className="list-group-item mb-3">
                                <h5 className="mb-2"> {<UnsafeComponent html={pregunta?.texto_pregunta} />}</h5>

                                {/* Listar las respuestas de la pregunta */}
                                <ul className="list-group">
                                    {pregunta.respuestas.map((respuesta, index) => (
                                        <li
                                            key={index}
                                            className={`list-group-item ${respuesta.es_correcta ? "list-group-item-success" : ""
                                                }`}
                                        >
                                            {<UnsafeComponent html={respuesta.texto_respuesta} />}
                                            {respuesta.es_correcta && (
                                                <span className="badge bg-success ms-2">Correcta</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                {/* Opciones para editar o eliminar la pregunta */}
                                <div className="mt-3">
                                    <Link to={`/admin/editarPregunta/${pregunta.id_pregunta}`} className="btn btn-warning me-2">
                                        Editar
                                    </Link>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No hay preguntas disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListarPreguntas;
ListarPreguntas.propTypes = { html: PropTypes.string }