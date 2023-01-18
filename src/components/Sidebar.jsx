import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Sidebar() {
  const { auth } = useAuth();

  return (
    <aside className='md:w-1/3 lg:w-1/5 px-5 py-5 '>
      <p className='text-xl text-center md:text-left md:mt-3 font-bold'>Hola  <span className='font-black text-amber-500'>{auth.nombre}</span></p>

      <Link
        className='flex items-center justify-center gap-2 hover:text-sky-700 hover:bg-white transition-colors text-xs px-5 py-3 mt-4 rounded-lg uppercase font-bold bg-sky-700 text-white shadow'  
        to='crear-proyecto'
      >

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
        </svg>
        
        Nuevo Proyecto
      
      </Link>
    </aside>
  )
}
