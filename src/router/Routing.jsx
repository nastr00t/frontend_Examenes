import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/private/PublicLayout';
import { Registro } from '../components/evaluado/Registro';
import Examenes from '../components/evaluado/Examenes';
import { VerExamen } from '../components/evaluado/VerExamen';
import { AuthProvider } from '../context/AuthProvider';
import { FinalizarPrueba } from '../components/evaluado/FinalizarPrueba';
import Login from '../components/public/Login';
import { PrivateLayout } from '../components/private/PrivateLayout';
import ExamenesAdmin from '../components/admin/ExamenesAdmin';
import { Evaluados } from '../components/admin/Evaluados';
import CrearExamen from '../components/admin/CrearExamen';
import CrearCategoria from '../components/admin/CrearCategoria';
import CrearPregunta from '../components/admin/CrearPregunta';
import ListarPreguntas from '../components/admin/ListarPreguntas';
import EditarPregunta from '../components/admin/EditarPregunta';
import { Logout } from '../components/public/Logout';
import CargarDesdeArchivo from '../components/admin/CargarDesdeArchivo';

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<Registro />} />
                        <Route path='registro' element={<Registro />} />
                        <Route path='examenes' element={<Examenes />} />
                        <Route path='verExamen' element={<VerExamen />} />
                        <Route path='finalizarPrueba' element={<FinalizarPrueba />} />
                        <Route path='admin/login' element={<Login />} />
                    </Route>
                    <Route path="/admin" element={<PrivateLayout />}>
                        <Route path='examenes' element={<ExamenesAdmin />} />
                        <Route path='logout' element={<Logout />} />
                        <Route path='evaluados' element={<Evaluados />} />
                        <Route path='crearExamen' element={<CrearExamen />} />
                        <Route path='categorias' element={<CrearCategoria />} />
                        <Route path='crearpregunta' element={<CrearPregunta />} />
                        <Route path='preguntas' element={<ListarPreguntas />} />                        
                        <Route path='preguntas' element={<ListarPreguntas />} />
                        <Route path='crearreguntas' element={< CrearPregunta />} />
                        <Route path='cargararchivo' element={< CargarDesdeArchivo />} />
                        <Route path='editarPregunta/:id' element={<EditarPregunta />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
