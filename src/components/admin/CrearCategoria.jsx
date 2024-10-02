import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";


const CrearCategoria = () => {
    const [nombre, setNombre] = useState(""); // Estado para almacenar el nombre de la categoría
    const [error, setError] = useState(""); // Estado para almacenar mensajes de error
    const [success, setSuccess] = useState(""); // Estado para almacenar el mensaje de éxito
    const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías existentes
    const token = localStorage.getItem("token");

    // Función para manejar el cambio del input del nombre
    const handleChange = (e) => {
        setNombre(e.target.value);
    };

    // Función para obtener las categorías del backend
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

    // Cargar las categorías cuando el componente se monte
    useEffect(() => {
        getCategorias();
    }, [token]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que el campo nombre no esté vacío
        if (!nombre) {
            setError("El campo nombre es obligatorio.");
            return;
        }

        try {
            const nuevaCategoria = {
                nombre: nombre,
            };

            // Petición POST para crear una nueva categoría
            const response = await fetch(`${Global.url}Examenes/IngresarCategoria`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(nuevaCategoria),
            });

            const data = await response.json();

            if (data.status === "success") {
                setSuccess("Categoría creada exitosamente.");
                setError(""); // Limpiar errores
                setNombre(""); // Limpiar el formulario
                getCategorias(); // Actualizar la lista de categorías
            } else {
                setError("Error al crear la categoría.");
            }
        } catch (error) {
            setError("Error en la petición al servidor." - error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Crear Categoría</h3>

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
                                    <label htmlFor="nombre">Nombre de la categoría</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Categoría"
                                        value={nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Crear Categoría
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <h3 className="text-center mb-4">Listado de Categorías</h3>

                    {categorias?.length === 0 ? (
                        <p className="text-center">No hay categorías disponibles.</p>
                    ) : (
                        <ul className="list-group">
                            {categorias.map((categoria) => (
                                <li key={categoria.id} className="list-group-item">
                                    {categoria.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CrearCategoria;
