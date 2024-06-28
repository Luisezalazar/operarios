import React, { useEffect,useState } from 'react'


const Datos = () => {
  const [data,setData]= useState([])
  useEffect(()=>{
    fetch("http://localhost:8081/reportes")
    .then(res=> res.json())
    .then(data=> setData(data))
    .catch(err => console.log(err));
  },[])
  return (
  <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-green-500">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID Reporte</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Hora</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actividad</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Número de Vuelo</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {data.map((d, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.id_reporte}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.Hora}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.Actividad}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{d.Numero_vuelo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  </div>
  )
}

export default Datos