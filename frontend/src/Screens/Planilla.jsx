import React, { useEffect,useState } from 'react'

const Planilla = () => {
  const [data,setData]= useState([])
  useEffect(()=>{
    fetch("http://localhost:8081/reportes")
    .then(res=> res.json())
    .then(data=> setData(data))
    .catch(err => console.log(err));
  },[])
  return (
    <div style={{padding: "50px"}}>
      
    <table>
      <thead>
        <th>id_reporte</th>
        <th>Hora</th>
        <th>Actividad</th>
        <th>Numero_vuelo</th>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td>{d.id_reporte}</td>
            <td>{d.Hora}</td>
            <td>{d.Actividad}</td>
            <td>{d.Numero_vuelo}</td>

          </tr>
        ))}
      </tbody>
    </table>

  </div>
  )
}

export default Planilla