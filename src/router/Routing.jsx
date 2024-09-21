import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/private/PublicLayout';
import { Registro } from '../components/evaluado/Registro';
export const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                <Route index element={<Registro />} />
                <Route path='registro' element={<Registro />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
