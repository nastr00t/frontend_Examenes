import { useState } from "react";
import { Global } from "../../helpers/Global";

const CargarDesdeArchivo = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = localStorage.getItem("token");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError("");
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Selecciona un archivo primero.");
            return;
        }

        // Crear el objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append('file', file); // 'file' será la clave en el backend

        try {
            const response = await fetch(`${Global.url}Examenes/CargarPlantilla`, {
                method: 'POST', headers: {
                    "Authorization": "Bearer " + token
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setSuccess('Preguntas cargadas exitosamente.');
                setError(null);
            } else {
                setError('Hubo un error al subir los archivos.');
            }
        } catch (err) {
            console.log(err);

            setError('Error en la solicitud. Intenta nuevamente.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Cargar Preguntas desde Archivo</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleUpload}>
                <div className="form-group mb-3">
                    <label htmlFor="file">Seleccionar Archivo excel</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Cargar Preguntas
                </button>
            </form>
        </div>
    );
};

export default CargarDesdeArchivo;
