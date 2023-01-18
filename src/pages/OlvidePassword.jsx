import { useState } from "react";
import { Link } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";


export default function OlvidePassword() {
  const [ statePassword, setStatePassword ] = useState({
    email: ''
  })
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async (e) => {
    setAlerta({})
    e.preventDefault()
    if(Object.values(statePassword).includes('')){
      setAlerta({ msg: 'El email es obligatorio', error: true })
      return
    }

    const { email } = statePassword

    try {
      const { data } = await clienteAxios.post(`/usuarios/recuperar-clave`, { email })
      setAlerta({ msg: data.msg })
    } catch (error) {
      // console.log(error.response.data)
      setAlerta({ msg: error.response.data.msg, error: true})
    }
  }

  const changeStateInput = (e) => {
    setStatePassword({
      ...statePassword,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-5xl capitalize'>Restable tu clave y accede a tus {' '} <span className='text-slate-700'>Proyectos</span></h1>

      {
        (Object.keys(alerta).length > 0)  && <Alerta alerta={alerta} />
      }
      <form
        className='my-5 bg-white shadow-md rounded-lg p-8'
        onSubmit={handleSubmit}
      >
        
        <InputForm 
          type='email'
          etiqueta='Email'
          placeholder="Indica tu correo registrado"
          state={statePassword}
          id='email'
          setState={changeStateInput}
        />

        <input 
          type='submit'
          value='Recuperar contraseña'
          className='w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />

      </form>

      <nav className='md:flex md:justify-between'>
        <Link
          to='registrar'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
          Regístrate 
        </Link>

        <Link
          to='/'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
          Inicia sesión  
        </Link>
      </nav>
    </>
  )
}
