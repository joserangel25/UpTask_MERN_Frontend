import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useProyectos } from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin'

import Alerta from '../components/Alerta';
import Colaborador from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import Tarea from '../components/Tarea';

//Socket.io
import io from 'socket.io-client'
import Spinner from '../components/spinner/Spinner';
import Volver from '../components/Volver';

let socket;

export default function DetalleProyecto() {

  const { id } = useParams()
  const { obtenerProyecto, 
          loading, 
          proyecto,
          eliminarProyecto, 
          handleShowModalTarea,
          alerta,
          submitAgregarTarea,
          socketEliminarTarea,
          socketActualizarTarea,
          socketActualizarEstadoTarea,
          socketAgregarColaborador } = useProyectos();

  useEffect(() => {
    if(!proyecto.nombre){
      obtenerProyecto(id)
    }
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', id)
  }, [])

  //Oyendo a SocketIO en todas las actividades
  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva) => {
      if(tareaNueva.proyecto === proyecto._id){
        submitAgregarTarea(tareaNueva)
      }
    });

    socket.on('tarea eliminada', (tareaEliminada) => {
      if(tareaEliminada.proyecto === proyecto._id){
        socketEliminarTarea(tareaEliminada)
      }
    });

    socket.on('tarea actualizada', (tareaActualizada) => {
      if(tareaActualizada.proyecto._id === proyecto._id){
        socketActualizarTarea(tareaActualizada)
      }
    });

    socket.on('estado tarea actualizado', (tareaEstadoActualizado) => {
      if(tareaEstadoActualizado.proyecto._id === proyecto._id){
        socketActualizarEstadoTarea(tareaEstadoActualizado)
      }
    });

    socket.on('colaborador agregado', (colaborador) => {
      if(colaborador.proyecto === proyecto._id){
        socketAgregarColaborador(colaborador)
      }
    })
  })

  const handleClickEliminar = async () => {
    if(confirm('¿Realmente desea eliminar este proyecto?')){
      await eliminarProyecto(id)
      
    }
  };

  const { msg } = alerta
  const admin = useAdmin();


  if(loading) return <div className='mt-7 md:mt-0 w-full h-full flex items-center justify-center'><Spinner /></div>

  if(msg && alerta.error) return <div className='md:w-3/5 mx-auto'><Alerta alerta={alerta}/></div>

  if(Object.keys(proyecto).length > 0 && !loading){
  return (
    <>
      <Volver />
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <h1 className='font-black text-4xl max-w-4xl first-letter:uppercase'>{proyecto.nombre}</h1>
        {
          admin && (
            <div className='flex gap-3 md:flex-col'>      
              <Link
                className='flex items-center gap-2 mt-4 md:mt-0 hover:text-sky-700 hover:bg-white transition-colors text-xs px-5 py-3  rounded-lg uppercase font-bold bg-sky-700 text-white text-center shadow'  
                to={`/proyectos/editar/${id}`}
              >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
                
                Editar
              
              </Link>

              {/* Boton de eliminar */}
              <button
                type='button'
                className='text-xs px-5 py-3 mt-4 md:mt-0 rounded-lg uppercase font-bold bg-red-600 hover:bg-white text-white hover:text-red-800 text-center flex gap-2 items-center shadow transition-colors'
                onClick={handleClickEliminar}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
                Eliminar
              </button>
            </div>
          )
        }
      </div>

      {/* finaliza */}

      <div className='flex justify-between md:justify-start md:gap-4 items-center my-4'>
        <h1 className='font-bold text-xl'>Tareas</h1>
        {
          admin && (
            <button
              type='button'
              className='flex items-center gap-2 hover:text-sky-700 hover:bg-white transition-colors text-xs px-5 py-3 rounded-lg uppercase font-bold bg-sky-700 text-white text-center shadow'  
              onClick={handleShowModalTarea}
            >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
              </svg>
              
              Añadir
            
            </button>
          )
        }
      </div>
      <div className="mt-5">
        {
          proyecto.tareas?.length ? 
          proyecto.tareas?.map(tarea => ( <Tarea key={tarea._id} tarea={tarea} />))
          : <p className='bg-white rounded-lg shadow text-center my-5 p-10'>No hay tarareas en este proyecto</p>
        }
      </div>

      <div className='flex justify-between md:justify-start md:gap-4 items-center my-4'>
        <h1 className='font-bold text-xl'>Colaboradores</h1>
        {
          admin && (
            <Link
              className='flex items-center gap-2 hover:text-sky-700 hover:bg-white transition-colors text-xs px-5 py-3 rounded-lg uppercase font-bold bg-sky-700 text-white text-center shadow'  
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
              </svg>
              
              Añadir
            
            </Link>
          )
        }
      </div>
      
      <div className='bg-white rounded-lg shadow'>
      <div>
        {
          proyecto.colaboradores?.length ? 
          proyecto.colaboradores?.map((colabora, ind) => ( <Colaborador key={ind} colaborador={colabora} />))
          : <p className='bg-white rounded-lg shadow text-center my-5 p-10'>No hay colaboradores en este proyecto</p>
        }
      </div>
      </div>

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )
  }
}
