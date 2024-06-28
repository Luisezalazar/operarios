import { Login } from './Login';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CerrarSesion from "./screens/CerrarSesion.jsx";
import Planilla from './screens/Planilla.jsx';
import Datos from './screens/Datos.jsx';
import Navegacion from './components/Navegacion.jsx';



function App() {

  const [user,setUser]= useState([])
  const handleLogout = () => {
    setUser([]);
};

  return (
    <div className="App">
     {
      !user.length>0 ? <Login setUser={setUser}/> //Estado cuando no hay usuario activo
      : 
      // Cuando existe usuario activo
      <Router>
      <Navegacion />
      <Routes>
          <Route path="/CerrarSesion" element={<CerrarSesion handleLogout={handleLogout} />} />
          <Route path="/" element={<Planilla />} />
          <Route path="/Datos" element={<Datos />} />
      </Routes>
  </Router>
     }
    </div>
  );
}

export default App;
