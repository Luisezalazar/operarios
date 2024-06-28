import React, { useState } from 'react';

const Planilla = () => {
  const [cargaCount, setCargaCount] = useState(0);
  const [cargas, setCargas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actividad, setActividad] = useState('');

  const handleAddCarga = () => {
    setCargaCount(cargaCount + 1);
    setCargas([...cargas, { id: cargaCount + 1, tipo: '', cantidad: '' }]);
  };

  const handleRemoveCarga = (id) => {
    setCargas(cargas.filter(carga => carga.id !== id));
    setCargaCount(cargaCount - 1);
  };

  const handleCargaChange = (index, field, value) => {
    const newCargas = cargas.slice();
    newCargas[index][field] = value;
    setCargas(newCargas);
  };

  const handleActividadChange = (value) => {
    setActividad(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hora = event.target.hora.value.trim();
    const operario = event.target.operario.value.trim();
    const vehiculo = event.target.vehiculo.value.trim();
    const numeroVuelo = event.target.numero_vuelo.value.trim();

    if (!hora || !actividad || !operario || !vehiculo || !numeroVuelo) {
      setErrorMessage('Todos los campos son obligatorios');
      setSuccessMessage('');
      return;
    }

    for (let i = 0; i < cargas.length; i++) {
      if (!cargas[i].tipo || !cargas[i].cantidad) {
        setErrorMessage('Todos los campos son obligatorios');
        setSuccessMessage('');
        return;
      }
    }

    setErrorMessage('');
    setSuccessMessage('Formulario enviado exitosamente');
    // Procesar el formulario aquí
    console.log('Formulario enviado:', { hora, actividad, operario, vehiculo, numeroVuelo, cargas });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Formulario</h2>
        {errorMessage && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{errorMessage}</div>}
        {successMessage && <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
            <input type="text" id="hora" name="hora" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Actividad</label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" value="Llegada" className="mr-2"
                  checked={actividad === 'Llegada'}
                  onChange={(e) => handleActividadChange(e.target.checked ? 'Llegada' : '')} />Llegada
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" value="Retiro" className="mr-2"
                  checked={actividad === 'Retiro'}
                  onChange={(e) => handleActividadChange(e.target.checked ? 'Retiro' : '')} />Retiro
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="operario" className="block text-sm font-medium text-gray-700">Operario</label>
            <input type="text" id="operario" name="operario" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="vehiculo" className="block text-sm font-medium text-gray-700">Vehículo</label>
            <input type="text" id="vehiculo" name="vehiculo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="numero_vuelo" className="block text-sm font-medium text-gray-700">Número de vuelo</label>
            <input type="text" id="numero_vuelo" name="numero_vuelo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Carga: <span>{cargaCount}</span></label>
            <button type="button" onClick={handleAddCarga} className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Añadir carga</button>
          </div>

          {cargas.map((carga, index) => (
            <div key={carga.id} className="mb-4 border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Tipo de carga:</label>
                <button type="button" onClick={() => handleRemoveCarga(carga.id)} className="ml-4 px-2 py-1 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Eliminar</button>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio" name={`tipo_carga_${carga.id}`} value="salmon" className="mr-2"
                    onChange={(e) => handleCargaChange(index, 'tipo', e.target.value)} />Salmon
                </label>
                <label className="inline-flex items-center ml-4">
                  <input type="radio" name={`tipo_carga_${carga.id}`} value="otro" className="mr-2"
                    onChange={(e) => handleCargaChange(index, 'tipo', e.target.value)} />Otro
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-700 mt-2">Cantidad:</label>
              <input type="text" name={`cantidad_carga_${carga.id}`} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                onChange={(e) => handleCargaChange(index, 'cantidad', e.target.value)} />
            </div>
          ))}

          <div className="flex justify-end mt-6">

            <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Enviar</button>
            
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Planilla;
