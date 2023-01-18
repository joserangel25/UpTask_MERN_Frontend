import { useState } from 'react'
import { Link } from "react-router-dom"
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import { InputForm } from "../components/InputForm"
import { inputsRegistro } from "../constants"


export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [ alerta, setAlerta ] = useState({})

  const handleSubmitRegistro = async (e) => {
    e.preventDefault()
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los passwords no son iguales',
        error: true
      })
      return 
    }

    if(password.length < 6){
      setAlerta({
        msg: 'Password muy corto. Mínimo 6 caracteres',
        error: true
      })
      return 
    }

    setAlerta({})

    //crear usuario en la Api

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password
      })
      setAlerta({msg: data.msg})
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true})
    }
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-5xl capitalize'>Cre tu cuenta y administra tus {' '} <span className='text-slate-700'>Proyectos</span></h1>

      {
        (Object.keys(alerta).length > 0 ) && <Alerta alerta={alerta}/>
      }

      <form
        className='my-5 bg-white shadow-md rounded-lg p-8'
        onSubmit={handleSubmitRegistro}
      >

        {/* {
          inputsRegistro.map((inp, ind) => (
            <InputForm
              key={ind}
              id={inp.for}
              etiqueta={inp.etiqueta}
              type={inp.type}
              placeholder={inp.placeholder}
              value={inp.value}
              onChange={inp.onChange}
            />
          ))
        } */}

        <div className='my-5'>
          <label 
            className='uppercase font-bold text-gray-600 block' 
            htmlFor='nombre'
          >Nombre</label>
          <input 
            type='text'
            placeholder='Agrega tu nombre'
            className='w-full mt-2 p-2 bg-gray-50 border rounded-xl outline-sky-700'
            id='nombre'
            value={nombre}
            onChange={(e) =>  setNombre(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label 
            className='uppercase font-bold text-gray-600 block' 
            htmlFor='email'
          >Email</label>
          <input 
            type='email'
            placeholder='Agrega tu correo'
            className='w-full mt-2 p-2 bg-gray-50 border rounded-xl outline-sky-700'
            id='email'
            value={email}
            onChange={(e) =>  setEmail(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label 
            className='uppercase font-bold text-gray-600 block' 
            htmlFor='password'
          >Password</label>
          <input 
            type='password'
            placeholder='Agrega tu nombre'
            className='w-full mt-2 p-2 bg-gray-50 border rounded-xl outline-sky-700'
            id='password'
            value={password}
            onChange={(e) =>  setPassword(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label 
            className='uppercase font-bold text-gray-600 block' 
            htmlFor='password2'
          >Repetir Password</label>
          <input 
            type='password'
            placeholder='Agrega tu nombre'
            className='w-full mt-2 p-2 bg-gray-50 border rounded-xl outline-sky-700'
            id='password2'
            value={repetirPassword}
            onChange={(e) =>  setRepetirPassword(e.target.value)}
          />
        </div>

        <input 
          type='submit'
          value='Crear cuenta'
          className='w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />

      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
          ¿Ya tienes una cuenta? Inicia sesión 
        </Link>

        <Link
          to='olvide-password'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
          Olvidé mi Password 
        </Link>
      </nav>
    </>
  )
}
