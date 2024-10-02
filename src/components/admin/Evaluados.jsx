import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Evaluados = () => {
    // Variable para almacenar el token para las peticiones a realizar en este componente
    const token = localStorage.getItem("token");
    const { auth } = useAuth();

    useEffect(() => {
        getEvaluados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [evaluados, setEvaluados] = useState([]);




    const getEvaluados = async (id) => {
        try {
            console.log(JSON.stringify({ idExamen: id }));

            const response = await fetch(`${Global.url}Evaluados/`, {
                method: "GET",
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
                setEvaluados(data.evaluados);

            }
        } catch (error) {
            console.error("Error en la petición al backend:", error);
        }
    }

    return (
        <div className="card w-90 mb-3 m-5">
            <h5 className="card-title">Hola {auth.nombre}</h5>
            <div className="card-body">
                <h5 className="card-title">Evaluados</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Identificación</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Fecha</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluados.map((evaluado) => {
                            return (
                                <tr key={evaluado.id_evaluado}>
                                    <td scope="row">{evaluado.numero_identificacion}</td>
                                    <td>{evaluado.nombre}</td>
                                    <td>{evaluado.apellidos}</td>
                                    <td>{evaluado.ciudad}</td>
                                    <td>{evaluado.fecha_creacion}</td>
                                    <td> <button className="btn btn-primary" ><i className="fa fa-eye">Evaluados </i></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
