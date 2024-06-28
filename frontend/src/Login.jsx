import { useState } from "react";


export function Login({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (nombre === "" || contraseña === "") {
            setError(true);
            setLoginError(false);
            return;
        }

        const nombreLowerCase = nombre.toLowerCase();
        const nombreEsperado = 'martin';

        // Validación de usuario
        if (nombreLowerCase === nombreEsperado && contraseña === '123321') {
            console.log('Inicio correcto');
            setUser([nombre]);
            setError(false);
            setLoginError(false);
            
        } else {
            setError(false);
            setLoginError(true);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl mb-4 text-blue-800">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <input 
                        className="p-2 border border-gray-800 rounded w-64" 
                        type="text" 
                        value={nombre} 
                        onChange={e => setNombre(e.target.value)} 
                        placeholder="Nombre de usuario" 
                    />
                    <input 
                        className="p-2 border border-gray-800 rounded w-64" 
                        type="password" 
                        value={contraseña} 
                        onChange={e => setContraseña(e.target.value)} 
                        placeholder="Contraseña" 
                    />
                    <button 
                        className="p-2 bg-red-600 text-white rounded w-64" 
                        type="submit">
                        Iniciar sesión
                    </button>
                </form>
                {error && <p className="text-red-500">Todos los campos son obligatorios</p>}
                {loginError && <p className="text-red-800">Datos incorrectos</p>}
            </div>
        </section>
    );
}
