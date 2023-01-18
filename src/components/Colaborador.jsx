import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin';

import io from 'socket.io-client'

let socket;

export default function Colaborador({colaborador}) {
  const { id } = useParams()
  const { handleModalEliminarColaborador, socketEliminarColaborador} = useProyectos();
  const { nombre, email } = colaborador;
  const admin = useAdmin()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', id)
  }, [])

  useEffect(() => {
    socket.on('colaborador eliminado', (info) => {
      //id es el parametro del ID del proyecto
      if(id === info.idProyecto){
        socketEliminarColaborador(info.idColaborador)
      }
    })
  })
  
  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div>
        <p className='font-bold uppercase'>{nombre}</p>
        <p className='text-sm text-gray-500'>{email}</p>
      </div>
      <div>
      {
        admin && (
          <button
            type='button'
            className="bg-red-600 hover:bg-red-800 transition-colors font-bold text-sm rounded-lg px-3 py-2 text-white"
            onClick={() => handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>
        )
      }
      </div>
    </div>
  )
}
