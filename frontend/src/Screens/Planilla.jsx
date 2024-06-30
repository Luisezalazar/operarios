import React, { useState, useEffect } from 'react';

const Planilla = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actividad, setActividad] = useState('');
  const [tipo_actividad, setTipo_actividad] = useState('');
  const [operarios, setOperarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const fetchOperarios = async () => {
      try {
        const response = await fetch('http://localhost:8081/operario');
        if (!response.ok) {
          throw new Error('Error al obtener operarios');
        }
        const data = await response.json();
        setOperarios(data);
      } catch (error) {
        console.error('Error fetching operarios:', error);
      }
    };

    fetchOperarios();
  }, []);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch('http://localhost:8081/vehiculo');
        if (!response.ok) {
          throw new Error('Error al obtener vehículos');
        }
        const data = await response.json();
        setVehiculos(data);
      } catch (error) {
        console.error('Error fetching vehiculos:', error);
      }
    };

    fetchVehiculos();
  }, []);

  const handleActividadChange = (value) => {
    setActividad(value);
    if (value !== 'Retiro') {
      setTipo_actividad('');
    }
  };

  const handleTipo_actividadChange = (option) => {
    setTipo_actividad(option);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const hora = formData.get('hora').trim();
    const actividades = actividad;
    const tipo_actividades = tipo_actividad;
    const operario = event.target.operario.id;
    const vehiculo = formData.get('vehiculo').trim();
    const numeroVuelo = formData.get('numero_vuelo').trim();
    const cargaSalmon = formData.get('cargaSalmon').trim();
    const cargaGeneral = formData.get('cargaGeneral').trim();
    console.log(hora,actividad,tipo_actividad,operario,vehiculo,numeroVuelo,cargaGeneral,cargaSalmon)

    // Validar que todos los campos están completos
    if (!hora  || !operario || !vehiculo || !numeroVuelo || !cargaSalmon || !cargaGeneral) {
      setErrorMessage('Todos los campos son obligatorios');
      setSuccessMessage('');
      return;
    }

    try {
      const responseFormulario = await fetch('http://localhost:8081/formulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hora,
          actividades,
          tipo_actividades,
          operario,
          vehiculo,
          numeroVuelo,
          cargaSalmon: cargaSalmon,
          cargaGeneral: cargaGeneral
        })
      });

      if (!responseFormulario.ok) {
        throw new Error('Error al enviar el formulario');
      }

      const resultFormulario = await responseFormulario.json();
      console.log('Formulario enviado:', resultFormulario);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al enviar el formulario');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Todos los datos se han enviado correctamente');
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
            <input type="time" id="hora" name="hora" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Actividad</label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input type="checkbox" value="Llegada" className="mr-2"
                  checked={actividad === 'Llegada'}
                  onChange={() => handleActividadChange('Llegada')} />Llegada
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" value="Retiro" className="mr-2"
                  checked={actividad === 'Retiro'}
                  onChange={() => handleActividadChange('Retiro')} />Retiro
              </label>
            </div>
          </div>

          {actividad === 'Retiro' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">El operario:</label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="inline-flex items-center">
                  <input type="radio" value="retira" className="mr-2"
                    checked={tipo_actividad === 'retira'}
                    onChange={() => handleTipo_actividadChange('retira')} />Retira
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="seLleva" className="mr-2"
                    checked={tipo_actividad === 'seLleva'}
                    onChange={() => handleTipo_actividadChange('seLleva')} />Se lleva
                </label>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="operario" className="block text-sm font-medium text-gray-700">Operario</label>
            <input list="listaoperario" id="operario" name="operario" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            <datalist id="listaoperario">
              {operarios.map((operario) => (
                <option key={operario.id_operario} value={`${operario.nombre} ${operario.apellido}`} id={"asdasd"} />
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label htmlFor="vehiculo" className="block text-sm font-medium text-gray-700">Vehículo</label>
            <input list="listavehiculo" id="vehiculo" name="vehiculo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
            <datalist id="listavehiculo">
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.id_vehiculo} value={`${vehiculo.modelo} ${vehiculo.patente}`} />
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label htmlFor="numero_vuelo" className="block text-sm font-medium text-gray-700">Número de Vuelo</label>
            <input type="text" id="numero_vuelo" name="numero_vuelo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="cargaSalmon" className="block text-sm font-medium text-gray-700">Cantidad de Salmón</label>
            <input type="number" id="cargaSalmon" name="cargaSalmon" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="cargaGeneral" className="block text-sm font-medium text-gray-700">Cantidad General</label>
            <input type="number" id="cargaGeneral" name="cargaGeneral" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Planilla;
