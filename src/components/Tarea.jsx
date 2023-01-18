import { formatearFecha } from "../helpers/formatearFecha"
import { useProyectos } from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin";


export default function Tarea({tarea}) {

  const { handleEditarTarea, handleEliminarTarea, cambiarEstadoTarea } = useProyectos();
  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id, completado } = tarea
  const admin = useAdmin()

  return (
    <div className={`${estado ? 'bg-gray-50' : 'bg-white'} shadow rounded-lg border-b p-5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 mb-5`}>
      <div className="flex flex-col items-start">
        <p className="mb-1 text-lg font-bold text-sky-700 uppercase">{nombre}</p>
        <p className="mb-1 text-sm text-gray-600 normal-case">{descripcion}</p>
        <p className="mb-1 text-sm text-gray-600 font-bold uppercase">
          Entrega: <span className="normal-case font-normal">{ formatearFecha(fechaEntrega) } </span>
        </p>
        <p className="text-gray-600 text-sm font-bold uppercase">
          Prioridad: <span className="normal-case font-normal">{prioridad}</span>
        </p>

        {
          estado && <p className="text-sm font-bold text-white bg-green-600 p-1 rounded my-2">Completado por: {completado?.nombre}</p>
        }
      </div>
      <div className="flex gap-2">
        {
          admin && (
            <button
              
              onClick={() => handleEditarTarea(tarea)}
              className="bg-indigo-600 font-bold text-sm rounded-lg px-4 py-3 text-white"
            >Editar</button>
          )
        }
        <button
          type='button'
          className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} font-bold text-sm rounded-lg px-4 py-3 text-white`}
          onClick={() => cambiarEstadoTarea(_id)}
        >{estado ? 'Completa' : 'Incompleta'}</button>
        
        {
          admin && (
            <button
              className="bg-red-600 font-bold text-sm rounded-lg px-4 py-3 text-white"
              onClick={() => handleEliminarTarea(tarea)}
            >Eliminar</button>
          )
        }
      </div>
    </div>
  )
}
