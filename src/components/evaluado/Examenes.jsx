import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Examenes = () => {
    // Variable para almacenar el token para las peticiones a realizar en este componente
    const token = localStorage.getItem("tokenEvaluado");
    const navigate = useNavigate();
    const { auth,  setPrueba } = useAuth();
    
    useEffect(() => {
        getExamenes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [examenes, setExamenes] = useState([]);


    const getExamenes = async () => {
        try {
            const response = await fetch(`${Global.url}Examenes/VerExamenes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            // Obtener la información retornada por la request
            const data = await response.json();
            // Usar la variable de estado para asignar el array de usuarios que sigues recibido. Si la petición es exitosa, actualiza los usuarios
            if (data && data.status === "success") {
                setExamenes(data.examenes);
            }
        } catch (error) {
            console.error("Error en la petición al backend:", error);
        }
    }

    const getPrueba = async (id) => {
        try {
            console.log(JSON.stringify({ idExamen: id }));

            const response = await fetch(`${Global.url}Evaluados/CreateExamenEvaluado?idExamen=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            });

            // Obtener la información retornada por la request
            const data = await response.json();
            console.log(data);

            // Usar la variable de estado para asignar el array de usuarios que sigues recibido. Si la petición es exitosa, actualiza los usuarios
            if (data && data.status === "success") {
                // Filtrar usuarios para excluir al usuario autenticado

                setPrueba(data.preguntas);
                sessionStorage.setItem("prueba", JSON.stringify(data.preguntas));
                navigate("/verExamen");
            }

        } catch (error) {
            console.error("Error en la petición al backend:", error);
        }

    }

    return (
        <div className="card w-90 mb-3 m-5">
            <h5 className="card-title">Hola {auth.nombre}</h5>
            <div className="card-body">
                <h5 className="card-title">Examenes disponibles</h5>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Exámen</th>
                            <th scope="col">Preguntas</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {examenes.map((examen) => {
                            return (
                                <tr key={examen.id_examen}>
                                    <th scope="row">{examen.id_examen}</th>
                                    <td>{examen.titulo}</td>
                                    <td>{examen.cantidad_preguntas}</td>
                                    <td> <button className="btn btn-primary" onClick={() => getPrueba(examen.id_examen)}><i className="fa fa-eye">Ver </i></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Examenes.propTypes = {}

export default Examenes