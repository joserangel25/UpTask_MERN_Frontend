import React, { useEffect } from 'react'
import { useProyectos } from '../hooks/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto';

import io from 'socket.io-client'


let socket;
export default function Proyectos() {

  const { proyectos, proyecto, setProyecto } = useProyectos();
  
  useEffect(() => {
    // socket = io(import.meta.env.VITE_BACKEND_URL)

    if(proyecto?.nombre){
      setProyecto({})
    }
  }, [])

  useEffect(() => {
    // console.log(import.meta.env.VITE_BACKEND_URL)
    socket = io(import.meta.env.VITE_BACKEND_URL)
   
  })
  
  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      <div className='bg-white shadow mt-10 rounded-lg'>
        {
          proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto 
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
          :
          <p className='text-center text-gray-600 uppercase p-5'>No hay proyectos aún</p>
        }
      </div>
    </>
  )
}
