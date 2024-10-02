
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global"; // Ajusta la ruta si es necesario
import { Link } from "react-router-dom";
const ExamenesAdmin = () => {
    const [examenes, setExamenes] = useState([]);
    const [error, setError] = useState(""); // Para manejar errores
    const [loading, setLoading] = useState(true); // Estado de carga
    const token = localStorage.getItem("token");

    // Obtener los exámenes desde el backend
    useEffect(() => {
        const getExamenes = async () => {
            try {
                const response = await fetch(`${Global.url}Examenes/VerExamenes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                });
                const data = await response.json();
                if (response.ok && data.status === "success") {
                    setExamenes(data.examenes); // Suponiendo que el array de exámenes viene en "examenes"
                } else {
                    setError("No se pudieron cargar los exámenes.");
                }
            } catch (error) {
                console.error("Error al obtener los exámenes:", error);
                setError("Error al conectarse con el servidor.");
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        getExamenes();
    }, [token]);

    if (loading) {
        return <div className="text-center mt-5">Cargando exámenes...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Listado de Exámenes</h2>

            {examenes.length === 0 ? (
                <div className="alert alert-info text-center">No hay exámenes disponibles.</div>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Fecha Límite</th>
                                <th>Cantidad de Preguntas</th>
                                <th>Estado</th>
                                <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                            {examenes.map((examen) => (
                                <tr key={examen.id_examen}>
                                <td>{examen.id_examen}</td>
                                <td>{examen.titulo}</td>
                                <td>{examen.descripcion}</td>
                                <td>{new Date(examen.fecha_limite).toLocaleDateString()}</td>
                                <td>{examen.cantidad_preguntas}</td>
                                <td>{examen.estado ? "Activo" : "Inactivo"}</td>
                                <td>
                                    <Link to={`/admin/evaluados`} className="btn btn-warning me-2">
                                        Evaluados
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExamenesAdmin;
