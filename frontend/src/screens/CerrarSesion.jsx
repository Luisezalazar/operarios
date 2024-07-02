import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CerrarSesion = ({ handleLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        handleLogout();
        navigate("/");
    }, [handleLogout, navigate]);

    return (
        <div>
            Cerrando sesión...
        </div>
    );
};

export default CerrarSesion;