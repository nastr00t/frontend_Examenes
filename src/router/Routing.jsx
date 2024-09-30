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
                    </Route>
                    <Route path="/admin" element={<PrivateLayout />}>
                        <Route path='login' element={<Login />} />
                        <Route path='examenes' element={<ExamenesAdmin />} />
                        <Route path='evaluados' element={<Evaluados />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
