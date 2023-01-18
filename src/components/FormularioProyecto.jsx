import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useProyectos } from '../hooks/useProyectos';
import Alerta from './Alerta'

export default function FormularioProyecto() {

  const [ nombre, setNombre ] = useState('')
  const [ descripcion, setDescripcion ] = useState('')
  const [ fechaEntrega, setFechaEntrega ] = useState('')
  const [ cliente, setCliente ] = useState('');

  //TODO: hacer funcionar state compuesto
  //Refactorizando state
  // const [ stateFormulario, setStateFormulario ] = useState({
  //   nombre: '',
  //   descripcion: '',
  //   fechaEntrega: '',
  //   cliente: ''
  // })

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();
  const { id } = useParams();

  useEffect(() => {
    mostrarAlerta({})
    if(id && proyecto?.nombre){
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)
    }
  }, [id])

  
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if([nombre, descripcion, fechaEntrega, cliente].includes('')){
      mostrarAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      setTimeout(() => {
        mostrarAlerta({})
      }, 3000);
      return 
    }

    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }


  return (
    <>
    {
      (Object.keys(alerta).length > 0 && <div className='md:w-4/5 md:mx-auto'><Alerta alerta={alerta} /></div>)
    }
    <form 
      onSubmit={handleSubmit}
      className="w-full bg-white py-7 px-5 md:w-4/5 md:mx-auto lg:w-full lg:grid lg:grid-cols-2 lg:gap-3 rounded-lg"
    >
      
      <div className='mb-5'>
        <label htmlFor="nombre" className="text-gray-700 uppercase text-sm font-bold">Nombre proyecto</label>
        <input 
          id='nombre'
          type='text'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          placeholder="Pon le un nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label htmlFor="fecha-entregaa" className="text-gray-700 uppercase text-sm font-bold">Fecha de Entrega</label>
        <input 
          id='fecha-entrega'
          type='date'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label htmlFor="descripcion" className="text-gray-700 uppercase text-sm font-bold">Descripción</label>
        <textarea 
          id='descripcion'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md h-10"
          placeholder="Describe el proyecto"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label htmlFor="nombre-cliente" className="text-gray-700 uppercase text-sm font-bold">Nombre del Cliente</label>
        <input 
          id='nombre-cliente'
          type='text'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          placeholder="¿Para quién es?"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>
      
      <input 
        type='submit'
        value={id ? 'actualizar Proyecto' : 'Crear proyectos'}
        className='bg-sky-600 w-full lg:grid lg:col-start-1 lg:col-end-3  p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors'
      />
    </form>
    </>
  )
  
}


/* 
  <div className='mb-5'>
        <label htmlFor="nombre" className="text-gray-700 uppercase text-sm font-bold">Nombre proyecto</label>
        <input 
          id='nombre'
          type='text'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label htmlFor="descripcion" className="text-gray-700 uppercase text-sm font-bold">Descripción</label>
        <textarea 
          id='descripcion'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          placeholder="Nombre del proyecto"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label htmlFor="fecha-entregaa" className="text-gray-700 uppercase text-sm font-bold">Fecha de Entrega</label>
        <input 
          id='fecha-entrega'
          type='date'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label htmlFor="nombre-cliente" className="text-gray-700 uppercase text-sm font-bold">Nombre del Cliente</label>
        <input 
          id='nombre-cliente'
          type='text'
          className="w-full mt-2 placeholder-gray-400 border p-2 rounded-md shadow-md"
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>
      
      <input 
        type='submit'
        value={id ? 'actualizar Proyecto' : 'Crear proyectos'}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors'
      />
    
*/