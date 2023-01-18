import React, { useState } from 'react'
import { useProyectos } from '../hooks/useProyectos'
import Alerta from './Alerta'


export default function FormularioColaborador() {
  const [ email, setEmail ] = useState('')
  const { alerta, mostrarAlerta, submitColaborador } = useProyectos()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(email === ''){
      mostrarAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    mostrarAlerta({})
    submitColaborador(email)

  }
  const { msg } = alerta
  return (
    <form
      className='bg-white py-10 px-5 w-full md:w-3/5 rounded-lg shadow'
      onSubmit={handleSubmit}
    >
      {
        msg && <Alerta alerta={alerta} />
      }
      <div className='mb-4'>
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor='correo'
        >
          Email colaborador
        </label>
        <input 
          type='email'
          id='correo'
          placeholder='Escribe el correo del colaborador'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input 
        type='submit'
        className='bg-sky-700 hover:bg-white w-full p-3 text-white hover:text-sky-700 uppercase font-bold cursor-pointer transition-colors rounded shadow text-xs'
        value={'Buscar colaborador'}
      />
    </form>
  )
}
