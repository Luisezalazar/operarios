import React, { useEffect, useState } from 'react';

const Datos = () => {
  const [formularios, setFormularios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [operarios, setOperarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch datos del formulario
        const formularioResponse = await fetch("https://operarios-backend-two.vercel.app/api/formularios");
        if (!formularioResponse.ok) {
          throw new Error('Error al obtener los formularios');
        }
        const formularioData = await formularioResponse.json();
        setFormularios(formularioData);

        // Fetch datos de vehículos
        const vehiculosResponse = await fetch("https://operarios-backend-two.vercel.app/api/vehiculos");
        if (!vehiculosResponse.ok) {
          throw new Error('Error al obtener los vehículos');
        }
        const vehiculosData = await vehiculosResponse.json();
        setVehiculos(vehiculosData);

        // Fetch datos de operarios
        const operariosResponse = await fetch("https://operarios-backend-two.vercel.app/api/operarios");
        if (!operariosResponse.ok) {
          throw new Error('Error al obtener los operarios');
        }
        const operariosData = await operariosResponse.json();
        setOperarios(operariosData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
        {formularios.map((formulario, index) => {
          const operarioData = operarios.find(op => op.id_operario === formulario.id_operario) || {};
          const vehiculoData = vehiculos.find(v => v.id_vehiculo === formulario.id_vehiculo) || {};

          return (
            <div key={index} className="mb-4">
              <h1 className="text-sm text-gray-900">
                || Hora: {formulario.hora} || Actividad: {formulario.actividad} || Operario: {operarioData.nombre} {operarioData.apellido} RUT: {operarioData.rut} TICA: {operarioData.tica}|| en el tractor de carga {vehiculoData.modelo} {vehiculoData.patente} || {formulario.tipo_actividad} {formulario.actividad === "Llegada" ? "trae" : " "} carga vuelo: LA {formulario.numero_vuelo}
              </h1>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-900">
                <li>{formulario.cargaSalmon} dolly con Salmon </li>
                <li>{formulario.cargaGeneral} dolly con General</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Datos;
