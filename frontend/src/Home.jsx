import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Screens/Inicio.jsx";
import Planilla from './Screens/Planilla.jsx';
import Datos from './Screens/Datos.jsx';
import Navegacion from './components/Navegacion.jsx'

export function Home({ user, setUser }) {
    const handleLogout = () => {
        setUser([]);
    };

    return (
        <div className="flex flex-col">
            <Router>
                <Navegacion />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/Planilla" element={<Planilla />} />
                    <Route path="/Datos" element={<Datos />} />
                </Routes>
            </Router>

            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}
