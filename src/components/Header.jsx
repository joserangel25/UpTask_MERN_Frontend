import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useProyectos } from '../hooks/useProyectos'
import Busqueda from './Busqueda';

export default function Header() {

  const { cerrarSesionAuth } = useAuth();
  const { modalBuscador, handleShowModalBuscador, cerrarSesionProyectos } = useProyectos();

  const handleCerrarSesion  = () => {
    cerrarSesionProyectos()
    cerrarSesionAuth()
    sessionStorage.removeItem('token')
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className="md:flex md:justify-between md:items-center">
        <Link to='/' className='text-4xl text-sky-600 font-black mb-5 md:mb-0 text-center'>UpTask</Link>
        
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button
            type='button'
            className='font-bold uppercase'
            onClick={handleShowModalBuscador}
          >Buscar proyecto</button>
          <Link 
            to='/proyectos'
            className='font-bold uppercase'
          >
            Proyectos
          </Link>
          
          <button
            type='button'
            className='text-white text-sm bg-sky-600 p-2 ml-2 rounded-md font-bold uppercase'
            onClick={handleCerrarSesion}
          >
            Cerrar sesión
          </button>

          <Busqueda />
        </div>
      </div>

    </header>
  )
}
