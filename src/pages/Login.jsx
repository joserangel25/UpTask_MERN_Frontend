import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

import { InputForm } from '../components/InputForm'
import { inputsLogin } from '../constants'
import Alerta from '../components/Alerta'
import { useAuth } from '../hooks/useAuth'

export default function Login() {

  const [ stateLogin, setStateLogin ] = useState({
    email: '',
    password: ''
  });

  const [ alerta, setAlerta ] = useState({});

  const { setAuth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if(token) navigate('proyectos')
  }, [])
  

  const changeStateInput = (e) => {
    setStateLogin({
      ...stateLogin,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    if(Object.values(stateLogin).includes('')){
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }

    const { email, password } = stateLogin

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      setAlerta({})
      sessionStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
    }
  }

  return (
    <>
      <h1 className='text-sky-600 font-black text-5xl capitalize'>Inicia sesión y administra tus {' '} <span className='text-slate-700'>Proyectos</span></h1>

      {
        (Object.keys(alerta).length > 0) && <Alerta alerta={alerta} />
      }

      <form
        className='bg-white shadow-md rounded-lg p-8 mt-5'
        onSubmit={handleSubmitLogin}
      >
        
        {
          inputsLogin.map((inp, ind) => (
            <InputForm 
              key={ind}
              type={inp.type}
              placeholder={inp.placeholder}
              etiqueta={inp.etiqueta}
              id={inp.for}
              state={stateLogin}
              setState={changeStateInput}
            />
          ))
        }

        <input 
          type='submit'
          value='Iniciar sesión'
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
          to='olvide-password'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
          Recuperar clave 
        </Link>
      </nav>
    </>
  )
}
