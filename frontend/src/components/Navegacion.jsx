import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

const links = [
  {
    link: '/',
    text:'Inicio',
    id:1,
  },
  {
    link: "/Planilla",
    text: "Planilla",
    id: 2,
  },
  {
    link: "/Datos",
    text: "Datos",
    id: 3,
  }
]

const Navegacion = () => {
    const[isMenuOpen, setIsMenuOpen] = useState (false);
    const[windowDimension, setWindowDimension] = useState({
    
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
    });

const detectSize= () => {
  setWindowDimension(
    {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    }
  )
}


useEffect(()=>{
window.addEventListener('resize', detectSize)
return () => {
  window.addEventListener('resize', detectSize)
}
},[windowDimension.innerWidth]);

  return (
    <div className={
      !isMenuOpen
      ? "flex fixed  items-center w-full px-4 justify-around bg-slate-800" 
      : "flex fixed flex-col h-full items-center w-full px-4 justify-around bg-slate-800" 
    } >
      <Link to={"/"} className="text-white font-semibold text-xl p-2" >
      Logo
       </Link>
      {
        windowDimension.innerWidth>768
        ? links.map((l) => (
          <Link className='text-xl text-white font-semibold' to={l.link} key={l.id} > {l.text} </Link>
        )) :
        isMenuOpen && links.map((l) => (
          <Link className='text-xl text-white font-semibold' to={l.link} key={l.id} > {l.text} </Link>
        ))}
       {!isMenuOpen && windowDimension.innerWidth<768 ?(
        <AiOutlineMenu cursor={"pointer"} size={24} color='#f2f2f2' onClick={()=>setIsMenuOpen(true)} /> 
      ): windowDimension.innerWidth<768 && ( 

        <AiOutlineClose cursor={"pointer"} size={24} color='#f2f2f2' onClick={()=>setIsMenuOpen(false)} />)}
    </div>
  )
}

export default Navegacion