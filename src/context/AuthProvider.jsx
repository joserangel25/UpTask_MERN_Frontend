import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [ auth, setAuth ] = useState({});
  const [ loadingAuth, setLoadingAuth ] = useState(true)

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = sessionStorage.getItem('token')

      if(!token){
        setLoadingAuth(false)
        return 
      }

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/usuarios/perfil', options)
        setAuth(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingAuth(false)
      }

    }
    autenticarUsuario()
  }, [])
  

  const cerrarSesionAuth = () => {
    setAuth({})
  }

  const value = {
    auth, 
    setAuth,
    loadingAuth,
    cerrarSesionAuth
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider