import React, { useEffect, useState } from 'react';

const Datos = () => {
  const [formulario, setFormulario] = useState([]);
  const [vehiculo, setVehiculos] = useState([]);
  const [operario, setOperarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/formulario")
      .then(res => res.json())
      .then(data => {
        console.log('formulario:', data);
        setFormulario(data);
      })
      .catch(err => console.log(err));

    fetch("http://localhost:8081/vehiculo")
      .then(res => res.json())
      .then(data => {
        console.log('Vehiculo:', data);
        setVehiculos(data);
      })
      .catch(err => console.log(err));

    fetch("http://localhost:8081/operario")
      .then(res => res.json())
      .then(data => {
        console.log('Operario:', data);
        setOperarios(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {formulario.map((d, i) => {
          const operarioData = operario.find(op => op.id === d.OperarioId) || {};
          const vehiculoData = vehiculo.find(v => v.id === d.VehiculoId) || {};

          return (
            <div key={i} className="mb-4">
              <h1 className="text-sm text-gray-900">
                | Hora: {d.hora} | Actividad: {d.actividad} | El operario {operarioData.nombre} {operarioData.apellido} RUT: {operarioData.rut} TICA: {operarioData.tica} en el tractor de carga {vehiculoData.modelo} {vehiculoData.patente}, {d.actividad === 'Retiro' ? 'retira' : 'trae'} carga vuelo LA {d.numero_vuelo}:
              </h1>
              <ul className="list-disc list-inside ml-4 text-sm text-gray-900">
                <li>{dollyData.cargaSalmon || 0} dolly Salmon</li>
                <li>{dollyData.cargaGeneral || 0} dolly Carga General</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Datos;
