import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import { Link, useParams } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { inputsNuevoPassword } from "../constants";
import Alerta from "../components/Alerta";


export default function NuevoPassword() {
  const [ contrasena, setContrasena ] = useState('');
  const [ stateNewPassword, setStateNewPassword ] = useState({
    password: ''
  })
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ alerta, setAlerta ] = useState({});
  const { token } = useParams()

  useEffect(() => {
    const confirmarToken = async () => {
      try {
        await clienteAxios(`/usuarios/recuperar-clave/${token}`);

        setTokenValido(true)
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true })
      }
    }
    confirmarToken()
  }, [])
  

  //TODO: hacer una version de estado compuesto para repartir con el map
  // const changeDatosInputs = (e) => {
  //   setContrasena({
  //     ...contrasena,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(stateNewPassword.password === '' || stateNewPassword.password.length < 6){
      setAlerta({ msg: 'Debes colocar la nueva contraseña y debe ser mayor a 6 caractéres', error: true })
      return
    }

    const { password } = stateNewPassword
    
    try {
      const url = `/usuarios/recuperar-clave/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setContrasena('')
      setAlerta({ msg: data.msg })
    } catch (error) {
      console.log(error.response)
    }
  }

  const changeStateInput = (e) => {
    setStateNewPassword({
      ...stateNewPassword,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <h1 
        className='text-sky-600 font-black text-5xl capitalize'
      >
        Define tu nueva {' '} <span className='text-slate-700'>Contraseña</span>
      </h1>
      {
        (Object.keys(alerta).length > 0) && <Alerta alerta={alerta} />
      }
      {
        tokenValido &&
        (
        <>
          <form
            onSubmit={handleSubmit}
            className='my-5 bg-white shadow-md rounded-lg p-8'
          >
          {/* {
            inputsNuevoPassword.map((inp, ind) =>(
              <InputForm 
                key={ind}
                type={inp.type}
                etiqueta={inp.etiqueta}
                id={inp.for}
                placeholder={inp.placeholder}
              />
            ))
          } */}

          <InputForm 
            type='password'
            etiqueta='Nuevo password'
            id='password'
            placeholder='Escribe la nueva contraseña'
            state={stateNewPassword}
            setState={changeStateInput}
          />
        

          <input 
            type='submit'
            value='Confirmar nuevo password'
            className='w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
          />

        </form>

        <Link
          to='/'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
          Inicia sesión  
        </Link>
        </>
        )
      }
    </>
  )
}
