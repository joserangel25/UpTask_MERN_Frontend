import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

export default function ConfirmarCuenta() {
  const [ alerta, setAlerta ] = useState({});
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`
        const { data } = await axios(url)
        setAlerta({msg: data.msg})
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true })
      }
    }
    confirmarCuenta()
  }, [])
  
  return (
   <>
    <h1 
      className='text-sky-600 font-black text-5xl capitalize'
    >
      Confirma tu  {' '} <span className='text-slate-700'>Cuenta</span>
    </h1>

    {
      (Object.keys(alerta).length > 0) && <Alerta alerta={alerta} />
    }

    {
      cuentaConfirmada && (
        <Link
          to='/'
          className='block text-center my-5 text-slate-600 uppercase text-sm hover:text-slate-800 transition-colors'
        >
           Inicia sesión 
        </Link>
      )
    }
   </>
  )
}
