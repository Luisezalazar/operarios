import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CerrarSesion from "./screens/CerrarSesion.jsx";
import Planilla from './screens/Planilla.jsx';
import Datos from './screens/Datos.jsx';
import Navegacion from './components/Navegacion.jsx';

export function Home({ user, setUser }) {
    const handleLogout = () => {
        setUser([]);
    };

    return (
        <div className="flex flex-col">
            <Router>
                <Navegacion />
                <Routes>
                    
                    <Route path="/CerrarSesion" element={<CerrarSesion handleLogout={handleLogout} />} />
                    <Route path="/Planilla" element={<Planilla />} />
                    <Route path="/Datos" element={<Datos />} />
                </Routes>
            </Router>
        </div>
    );
}
