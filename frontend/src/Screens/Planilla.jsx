import React, { useState } from 'react';

const Planilla = () => {
  const [cargaCount, setCargaCount] = useState(0);
  const [cargas, setCargas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actividad, setActividad] = useState('');
  const [operarioType, setOperarioType] = useState('registrado'); // Nuevo estado para tipo de operario

  const handleAddCarga = () => {
    setCargaCount(cargaCount + 1);
    setCargas([...cargas, { id: cargaCount + 1, tipo: '', cantidad: '' }]);
  };

  const handleRemoveCarga = (id) => {
    setCargas(cargas.filter(carga => carga.id !== id));
    setCargaCount(cargaCount - 1);
  };

  const handleCargaChange = (index, field, value) => {
    const newCargas = [...cargas];
    newCargas[index][field] = value;
    setCargas(newCargas);
  };

  const handleActividadChange = (value) => {
    setActividad(value);
  };

  const handleOperarioTypeChange = (type) => {
    setOperarioType(type);
  };

  const handleModeloVehiculoChange = (value) => {
    setModeloVehiculo(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hora = event.target.hora.value.trim();
    const vehiculo = event.target.vehiculo.value.trim();
    const modelo = event.target.modelo.value.trim();
    const numeroVuelo = event.target.numero_vuelo.value.trim();

    if (!hora || !actividad || !vehiculo || !modelo  || !numeroVuelo) {
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

    if (operarioType === 'nuevo') {
      const nombre = event.target.nombre.value.trim();
      const apellido = event.target.apellido.value.trim();
      const rut = event.target.rut.value.trim();
      const tica = event.target.tica.value.trim();

      if (!nombre || !apellido || !rut || !tica) {
        setErrorMessage('Todos los campos para operario nuevo son obligatorios');
        setSuccessMessage('');
        return;
      }
    } else {
      const operarioRegistrado = event.target.operarioRegistrado.value.trim();

      if (!operarioRegistrado) {
        setErrorMessage('Debe seleccionar un operario registrado');
        setSuccessMessage('');
        return;
      }
    }

    setErrorMessage('');
    setSuccessMessage('Formulario enviado exitosamente');
    // Procesar el formulario aquí
    console.log('Formulario enviado:', { hora, actividad, vehiculo, modelo, numeroVuelo, cargas });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Planilla</h2>
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
            <label className="block text-sm font-medium text-gray-700">Operario</label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input type="radio" value="registrado" className="mr-2"
                  checked={operarioType === 'registrado'}
                  onChange={() => handleOperarioTypeChange('registrado')} />Registrado
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="nuevo" className="mr-2"
                  checked={operarioType === 'nuevo'}
                  onChange={() => handleOperarioTypeChange('nuevo')} />Nuevo
              </label>
            </div>
          </div>

          {operarioType === 'nuevo' && (
            <div>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="nombre" name="nombre" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" id="apellido" name="apellido" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
                <input type="text" id="rut" name="rut" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="tica" className="block text-sm font-medium text-gray-700">TICA</label>
                <input type="text" id="tica" name="tica" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
              </div>
            </div>
          )}

          {operarioType === 'registrado' && (
            <div className="mb-4">
              <label htmlFor="operarioRegistrado" className="block text-sm font-medium text-gray-700">Operario Registrado</label>
              <input type="text" id="operarioRegistrado" name="operarioRegistrado" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="vehiculo" className="block text-sm font-medium text-gray-700">Vehículo</label>
            <input type="text" id="vehiculo" name="vehiculo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">Modelo</label>
            <input type="text" id="modelo" name="modelo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              onChange={(e) => handleModeloVehiculoChange(e.target.value)} />
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
