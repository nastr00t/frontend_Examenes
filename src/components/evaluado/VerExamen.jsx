import PropTypes from 'prop-types';
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/setForm";
import { useNavigate } from "react-router-dom";

export const VerExamen = () => {

    const { auth, setAuth } = useAuth();
    if (!auth && sessionStorage.getItem("evaluado")) {
        const evaluado = JSON.parse(sessionStorage.getItem("evaluado"));
        if (evaluado) {
            setAuth(evaluado);
        } else {
            console.error("Evaluado no encontrado en sessionStorage");
        }
    }

    const { form, changed } = useForm({});
    const [pregunta, setPregunta] = useState();
    const [evaluacion, setEvaluacion] = useState();
    const token = localStorage.getItem("tokenEvaluado");
    const navigate = useNavigate();

    // Validar que la prueba exista en el sessionStorage antes de usarla
    let prueba = JSON.parse(sessionStorage.getItem("prueba"))?.[0];
    if (!prueba) {
        console.error("No se encontró la prueba en sessionStorage");
        navigate("/error");  // Puedes redirigir a una página de error o dar un mensaje
        return null;
    }

    function UnsafeComponent({ html }) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    const getPreguntas = async () => {
        setEvaluacion(prueba);
        const preguntas = prueba.respuestas_Intento.filter(item => item.id_respuesta === null);

        // Si no hay más preguntas, redirigir a la página de finalización
        if (preguntas.length === 0) {
            navigate("/finalizarPrueba");
            return;
        }

        const index = Math.floor(Math.random() * preguntas.length);
        const pr = preguntas[index];

        try {
            // Petición Ajax al backend para obtener la pregunta
            const request = await fetch(Global.url + "Examenes/GetPregunta/" + pr.id_pregunta, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (!request.ok) {
                console.error("Error en la petición de la pregunta:", request.statusText);
                return;
            }

            const data = await request.json();
            setPregunta(data.pregunta);
        } catch (error) {
            console.error("Error obteniendo la pregunta:", error);
        }
    };

    const saveForm = async (e) => {
        e.preventDefault();
        try {
            let respuestaPregunta = form;
            let respuesta = prueba.respuestas_Intento.find(f => f.id_pregunta === pregunta.id_pregunta);

            if (respuesta) {
                respuesta.id_respuesta = respuestaPregunta.id_respuesta;

                // Petición para guardar la respuesta
                const request = await fetch(Global.url + "Evaluados/IngresarRespuestaPregunta", {
                    method: "POST",
                    body: JSON.stringify(respuesta),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                });

                if (!request.ok) {
                    console.error("Error guardando la respuesta:", request.statusText);
                    return;
                }

                const data = await request.json();
                console.log(data);

                if (data && data.status === "success") {
                    // Limpiar solo prueba en sessionStorage
                    sessionStorage.removeItem("prueba");
                    sessionStorage.setItem("prueba", JSON.stringify(data.preguntas));
                    prueba = JSON.parse(sessionStorage.getItem("prueba"))?.[0];
                    setEvaluacion(prueba);

                    // Reiniciar formulario
                    const myForm = document.getElementById("pregunta-form");
                    myForm?.reset();
                    getPreguntas();
                }
            }
        } catch (error) {
            console.error("Error en la petición al backend:", error);
        }
    };

    useEffect(() => {
        getPreguntas();
    }, [token, auth]);  // Sin necesidad de isMounted

    return (
        <div className="container-fluid mt-5">
            <div className="card mb-3 bg-black text-light">
                <div className="card-body">
                    <h3 className="card-subtitle mb-2">
                        {evaluacion?.id_examenNavigation?.titulo} - {evaluacion?.id_evaluadoNavigation?.nombre} {evaluacion?.id_evaluadoNavigation?.apellidos}
                    </h3>
                    <p>{evaluacion?.id_examenNavigation?.descripcion}</p>
                </div>
            </div>

            <form className="needs-validation" id="pregunta-form" onSubmit={saveForm}>
                <div className="card">
                    <div className="card-header">
                        {<UnsafeComponent html={pregunta?.texto_pregunta} />}
                    </div>
                    <ul className="list-group">
                        {pregunta?.respuestas.map((respuesta) => (
                            <li key={respuesta.id_respuesta} className="form-check list-group-item">
                                <input
                                    className="form-check-input m-1"
                                    value={respuesta.id_respuesta}
                                    onChange={changed}
                                    type="radio"
                                    name="id_respuesta"
                                    id="id_respuesta"
                                    required
                                />
                                <label className="form-check-label" htmlFor={respuesta.id_respuesta}>
                                    {<UnsafeComponent html={respuesta.texto_respuesta} />} 
                                </label>
                            </li>
                        ))}
                        <li className="form-check list-group-item">
                            <input
                                type="submit"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-primary"
                                value="Continuar"
                            />
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    );
};
VerExamen.propTypes = { html: PropTypes.string }