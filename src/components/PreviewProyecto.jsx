import { Link } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth.jsx'

export default function PreviewProyecto({proyecto}) {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto
  return (
    <div className='border-b p-5 flex flex-col md:flex-row md:items-center'>
      <p className='flex-1 font-bold'>
        {nombre}
        <span className='text-gray-500 uppercase font-normal'>
          {' '} {cliente}
        </span>
      </p>
      
      <div className='flex gap-2 items-center'>
        {
          (auth._id !== creador) && 
          ( <p className='bg-sky-500 text-white text-sm p-2 text-center rounded-md font-bold'>Colaborador</p>)
        }
        <Link 
          to={_id}
          className='mt-2 md:mt-0 bg-sky-700 hover:bg-white text-white hover:text-sky-700 rounded-lg p-2 text-sm font-bold uppercase transition-colors shadow'
        >Detalles</Link>
      </div>
    </div>
  )
}
