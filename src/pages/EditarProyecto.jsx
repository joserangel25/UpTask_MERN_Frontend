import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos'

import FormularioProyecto from '../components/FormularioProyecto';
import Spinner from '../components/spinner/Spinner';
import Volver from '../components/Volver';

export default function EditarProyecto() {

  const { proyecto, obtenerProyecto, eliminarProyecto } = useProyectos();
  // const [ individualProyecto, setIndividualProyecto ] = useState(proyecto)
  const { id } = useParams()

  useEffect(() => {

    if(!proyecto?.nombre){
      console.log('obteniendo proyecto')
      obtenerProyecto(id)
    } 
  }, [proyecto]);

  const handleClickEliminar = async () => {
    if(confirm('¿Realmente desea eliminar este proyecto?')){
      await eliminarProyecto(id)
      
    }
  }

  if(!proyecto.nombre) return <Spinner />

  return (
    <>
      <Volver />
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <h1 className='font-black text-4xl max-w-4xl first-letter:uppercase'>{proyecto.nombre}</h1>
        {/* <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
          <button
            type='button'
            className='text-xs  px-5 py-3 mt-4 rounded-lg uppercase font-bold bg-red-600 hover:bg-white text-white hover:text-red-800 text-center flex gap-2 items-center shadow transition-colors'
            onClick={handleClickEliminar}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
            </svg>

            Eliminar
          </button>
        </div> */}
      </div>
      <div className='mt-5 flex flex-col justify-center bg-white'>
        <FormularioProyecto />
      </div>
    </>
  )
}
