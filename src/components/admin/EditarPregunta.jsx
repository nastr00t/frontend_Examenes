import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global"; // Ajusta la ruta según tu archivo de configuración

const EditarPregunta = () => {
    const { id } = useParams(); // Obtener el id de la pregunta desde la URL
    const [pregunta, setPregunta] = useState(null); // Estado para la pregunta actual
    const [error, setError] = useState(""); // Estado para errores
    const [success, setSuccess] = useState(""); // Estado para mensajes de éxito
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Obtener la pregunta por ID cuando se monta el componente
    useEffect(() => {
        const getPregunta = async () => {
            try {
                const response = await fetch(`${Global.url}Examenes/GetPregunta/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                });

                const data = await response.json();
                if (response.ok && data.status === "success") {
                    setPregunta(data.pregunta);
                } else {
                    setError("No se pudo cargar la pregunta.");
                }
            } catch (error) {
                console.error("Error al obtener la pregunta:", error);
                setError("Error al conectarse con el servidor.");
            }
        };

        getPregunta();
    }, [id, token]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPregunta((prevPregunta) => ({
            ...prevPregunta,
            [name]: value,
        }));
    };

    // Manejar cambios en las respuestas
    const handleRespuestaChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedRespuestas = [...pregunta.respuestas];

        updatedRespuestas[index] = {
            ...updatedRespuestas[index],
            [name]: type === "checkbox" ? checked : value,
        };

        setPregunta((prevPregunta) => ({
            ...prevPregunta,
            respuestas: updatedRespuestas,
        }));
    };

    // Manejar el submit del formulario para actualizar la pregunta
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${Global.url}Examenes/EditarPregunta/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(pregunta), // Enviar la pregunta actualizada
            });
            console.log(pregunta);

            const data = await response.json();
            if (response.ok && data.status === "success") {
                setSuccess("Pregunta actualizada con éxito.");
                setTimeout(() => {
                    navigate("/admin/preguntas"); // Redirigir a la lista de preguntas después de 2 segundos
                }, 2000);
            } else {
                setError("Error al actualizar la pregunta.");
            }
        } catch (error) {
            console.error("Error al actualizar la pregunta:", error);
            setError("Error al conectarse con el servidor.");
        }
    };

    if (!pregunta) {
        return <div className="text-center mt-5">Cargando pregunta...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Pregunta</h2>

            {/* Mostrar mensaje de error o éxito */}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="texto_pregunta">Texto de la Pregunta</label>
                    <textarea
                        className="form-control"
                        id="texto_pregunta"
                        name="texto_pregunta"
                        rows="3"
                        value={pregunta.texto_pregunta}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Mapeamos las respuestas para que el usuario pueda editarlas */}
                {pregunta.respuestas.map((respuesta, index) => (
                    <div key={index} className="form-group mb-3">
                        <label htmlFor={`respuesta_${index}`}>Respuesta {index + 1}</label>
                        <textarea
                            className="form-control"
                            id={`respuesta_${index}`}
                            name="texto_respuesta"
                            rows="2"
                            value={respuesta.texto_respuesta}
                            onChange={(e) => handleRespuestaChange(index, e)}
                            required
                        />
                        <div className="form-check mt-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`correcta_${index}`}
                                name="es_correcta"
                                checked={respuesta.es_correcta}
                                onChange={(e) => handleRespuestaChange(index, e)}
                            />
                            <label className="form-check-label" htmlFor={`correcta_${index}`}>
                                ¿Es la respuesta correcta?
                            </label>
                        </div>
                    </div>
                ))}

                <button type="submit" className="btn btn-primary bg-dark w-100">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditarPregunta;
