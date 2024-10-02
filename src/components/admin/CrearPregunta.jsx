import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global"; 


const CrearPregunta = () => {
    const [categorias, setCategorias] = useState([]); // Estado para las categorías
    const [idCategoria, setIdCategoria] = useState(""); // Estado para la categoría seleccionada
    const [textoPregunta, setTextoPregunta] = useState(""); // Estado para la pregunta
    const [respuestas, setRespuestas] = useState([{ texto_respuesta: "", es_correcta: false }]); // Estado para las respuestas
    const [error, setError] = useState(""); // Estado para errores
    const [success, setSuccess] = useState(""); // Estado para éxito

    const token = localStorage.getItem("token");
    // Obtener las categorías al montar el componente
    useEffect(() => {
        const getCategorias = async () => {
            try {
                const response = await fetch(`${Global.url}Examenes/GetCategorias`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setCategorias(data.categoria); // Actualizar el estado con la lista de categorías
                }
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        getCategorias();
    }, [token]);

    // Manejar el cambio de la categoría seleccionada
    const handleCategoriaChange = (e) => {
        setIdCategoria(e.target.value);
    };

    // Manejar el cambio de texto de la pregunta
    const handlePreguntaChange = (e) => {
        setTextoPregunta(e.target.value);
    };

    // Manejar el cambio de texto de una respuesta específica
    const handleRespuestaChange = (index, e) => {
        const newRespuestas = [...respuestas];
        newRespuestas[index].texto_respuesta = e.target.value;
        setRespuestas(newRespuestas);
    };

    // Manejar el cambio de la opción correcta
    const handleCorrectaChange = (index) => {
        const newRespuestas = respuestas.map((respuesta, i) => ({
            ...respuesta,
            es_correcta: i === index, // Solo la respuesta seleccionada será correcta
        }));
        setRespuestas(newRespuestas);
    };

    // Añadir una nueva respuesta
    const handleAddRespuesta = () => {
        setRespuestas([...respuestas, { texto_respuesta: "", es_correcta: false }]);
    };

    // Eliminar una respuesta
    const handleRemoveRespuesta = (index) => {
        const newRespuestas = [...respuestas];
        newRespuestas.splice(index, 1);
        setRespuestas(newRespuestas);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén llenos
        if (!idCategoria || !textoPregunta || respuestas.some(r => !r.texto_respuesta)) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const nuevaPregunta = {
            id_categoria: parseInt(idCategoria),
            texto_pregunta: textoPregunta,
            id_usuario_creador: 1, // Reemplazar con el id del usuario que está creando la pregunta
            respuestas: respuestas,
        };

        try {
            const response = await fetch(`${Global.url}Examenes/IngresarPregunta`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(nuevaPregunta),
            });

            const data = await response.json();
            if (response.ok && data.status === "success") {
                setSuccess("Pregunta creada exitosamente.");
                setError("");
                setTextoPregunta("");
                setRespuestas([{ texto_respuesta: "", es_correcta: false }]);
            } else {
                setError("Error al crear la pregunta.");
            }
        } catch (error) {
            setError("Error en la petición al servidor."+error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Crear Pregunta</h3>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <form onSubmit={handleSubmit}>
                                {/* Categoría */}
                                <div className="form-group mb-3">
                                    <label htmlFor="categoria">Categoría</label>
                                    <select
                                        className="form-control"
                                        id="categoria"
                                        value={idCategoria}
                                        onChange={handleCategoriaChange}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Pregunta */}
                                <div className="form-group mb-3">
                                    <label htmlFor="pregunta">Texto de la Pregunta</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="pregunta"
                                        value={textoPregunta}
                                        onChange={handlePreguntaChange}
                                        required
                                    />
                                </div>

                                {/* Respuestas */}
                                <div className="form-group mb-3">
                                    <label>Respuestas</label>
                                    {respuestas.map((respuesta, index) => (
                                        <div key={index} className="input-group mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={respuesta.texto_respuesta}
                                                onChange={(e) => handleRespuestaChange(index, e)}
                                                placeholder={`Respuesta ${index + 1}`}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <input
                                                        type="radio"
                                                        name="es_correcta"
                                                        checked={respuesta.es_correcta}
                                                        onChange={() => handleCorrectaChange(index)}
                                                    />
                                                </div>
                                            </div>
                                            {respuestas.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveRespuesta(index)}
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={handleAddRespuesta}>
                                        Añadir Respuesta
                                    </button>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Crear Pregunta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearPregunta;
