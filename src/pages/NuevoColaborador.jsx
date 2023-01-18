import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';
import FormularioColaborador from "../components/FormularioColaborador";
import Alerta from '../components/Alerta';
import Volver from '../components/Volver';
import Spinner from '../components/spinner/Spinner';


export default function NuevoColaborador() {
  const { obtenerProyecto, proyecto, loading, colaborador, agregarColaborador, alerta } = useProyectos()
  const {id} = useParams()

  useEffect(() => {
    if(!proyecto.nombre){
      obtenerProyecto(id)
    }
  }, [])

  if(loading) return <div className='mt-7 md:mt-0 w-full h-full flex items-center justify-center'><Spinner /></div>

  return (
    <>
      <Volver />
      <p className='uppercase text-sm text-gray-400 font-bold'>Proyecto: {proyecto?.nombre}</p>
      <h1 className='text-4xl font-black'>Nuevo Colaborador(a)</h1>

      <div className='mt-6 flex justify-center'>
        <FormularioColaborador />
      </div>

      {
        colaborador?.nombre && (
          <div className='mt-5 flex justify-center'>

            <div className="bg-white w-full px-10 py-5 md:w-3/5 flex justify-between items-center">
              <p className='font-bold text-gray-600 uppercase text-xl md:text-lg'>{colaborador?.nombre}</p>
              <button
                className='bg-sky-700 hover:bg-white p-3 text-white hover:text-sky-700 shadow uppercase font-bold cursor-pointer transition-colors rounded text-xs'
                onClick={() => agregarColaborador({email: colaborador.email})}
              >
                Agregar
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}
