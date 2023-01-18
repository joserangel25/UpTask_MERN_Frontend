import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import clienteAxios from "../config/clienteAxios";
import { toast } from 'react-toastify'

//Socket.IO
import io from 'socket.io-client'

let socket;

export const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

  const [ proyectos, setProyectos ] = useState([])
  const [ proyecto, setProyecto ] = useState({})
  const [ loading, setLoading ] = useState(true);
  const [ alerta, setAlerta ] = useState({})
  const [ modalFormularioTarea, setModalFormularioTarea ] = useState(false)
  const [ tareaAccion, setTareaAccion ] = useState({})
  const [ modalEliminarTarea, setModalEliminarTarea ] = useState(false); 
  const [ colaborador, setColaborador ] = useState({});
  const [ modalEliminarColaborador, setModalEliminarColaborador ] = useState(false)
  const [ modalBuscador, setModalBuscador ] = useState(false);

  const { auth } = useAuth()
  const navigate = useNavigate()

  let controller = new AbortController();
  

  useEffect(() => {
    const obtenerProyectos = async () => {
      setLoading(true)
      const token = sessionStorage.getItem('token');
      if(!token) return 

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios('/proyectos', options);
        setProyectos(data)  
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    obtenerProyectos()
  }, [auth])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])
  

  const mostrarAlerta = (alert) => {
    setAlerta(alert) 
  } 

  const submitProyecto = async (proyecto) => {
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      if(proyecto.id){
        console.log('Editando...')
        await editarProyecto(proyecto, options)
      } else {
        console.log('creando....')
        await crearProyecto(proyecto, options)
      }
  }

  //Crea un proyecto 
  const crearProyecto = async (proyecto, options) => {
    try {
      const { data } = await clienteAxios.post('/proyectos', proyecto, options)
      setAlerta({ msg: 'Proyecto creado correctamente' })
      setProyectos([...proyectos, data])

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 1200);

    } catch (error) {
      console.log(error)
    }
  }
  //Edita un proyecto de la base de datos
  const editarProyecto = async (proyecto, options) => {
    try {
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, options)

      const newProyectos = proyectos.map(proyectState => proyectState._id === data._id ? data : proyectState)
      setProyectos(newProyectos)
      
      setAlerta({ msg: 'Proyecto actualizado correctamente' })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000);

    } catch (error) {
      console.log(error)
    }
  }

  //Devuelve el proyecto según ID
  const obtenerProyecto = async (id) => {
      setLoading(true)
      try {
        const token = sessionStorage.getItem('token');
    
        if(!token) return 

        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          signal: controller.signal
        }      

        setTimeout(() => {
          controller.abort()
        }, 5000);

        const { data } = await clienteAxios(`/proyectos/${id}`, options)
        setProyecto(data)
        setAlerta({})
      } catch (error) {
        //Se controlo que después de 3s no se obtenga la información de la base de datos y se cancela la llamada http
        if(error.message === 'canceled'){
          setAlerta({msg: 'El proyecto no existe o no está disponible.', error: true})
          setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
          }, 1300)
          return
        }
        //Ejecutamos paraa cualquier error diferente a que no exista el proyecto
        setAlerta({msg: error.response.data.msg, error: true})
        setTimeout(() => {
          setAlerta({})
          navigate('/proyectos')
        }, 1300);
      } finally {
        setLoading(false)
      }
  }
  
  const eliminarProyecto = async (id) => {
    try {
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, options)
      const newProyectos = proyectos.filter(proyectoState => proyectoState._id !== id)
      setProyectos(newProyectos)
      setAlerta({ msg: data.msg })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
        toast.success('Proyecto eliminado', {
          autoClose: 3000,
          pauseOnHover: false,
        })
      }, 500);

    } catch (error) {
      console.log(error) 
    }
  }

  const handleShowModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea)
    setTareaAccion({})
  }

  const submitTarea = async (tarea) => {
    // console.log(tarea)
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      if(!tarea.id){
        await crearTarea(tarea, options)
      } else {
        await editarTarea(tarea, options)
      }
  }

  const crearTarea = async (tarea, options) => {
    try {
      const { data } = await clienteAxios.post('/tareas', tarea, options)
      
      //Socket.io
      socket.emit('nueva tarea', data)
    } catch (error) {
      console.log(error)
    }
  }

  //Ejecuta la accion de abrir y/o cerrar modal y poner la tarea en el estado
  const handleEditarTarea = (tarea) => {
    setTareaAccion(tarea)
    setModalFormularioTarea(true)
  }

  //Ejecuta acción de editar la tarea
  const editarTarea = async (tarea, options) => {
    const { id } = tarea
    try {
      const { data } = await clienteAxios.put(`/tareas/${id}`, tarea, options)
      
      socket.emit('actualizar tarea', data)
      
      setAlerta({ msg: 'Tarea actualizada correctamente' })
      setTimeout(() => {
        setModalFormularioTarea(false)
        setTareaAccion({})
        setAlerta({})
      }, 1500);
    } catch (error) {
      console.log(error)
    }
  }

  //Ejecuta la accion de abrir y/o cerrar modal y poner la tarea en el estado
  const handleEliminarTarea = (tarea) => {
    setModalEliminarTarea(!modalEliminarTarea)
    setTareaAccion(tarea)
  }

  //Ejecuta acción de eliminar la tarea
  const eliminarTarea = async () => {
    try {
      const token = sessionStorage.getItem('token')
      if(!token) return 

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/tareas/${tareaAccion._id}`, options)

      socket.emit('eliminar tarea', tareaAccion)
      setAlerta({msg: data.msg})

      //Restableciendo los states
      setTimeout(() => {
        setModalEliminarTarea(false)
        setTareaAccion({})
        setAlerta({})
      }, 1500);
    } catch (error) {
      console.log(error)
    }
  }

  const submitColaborador = async email => {
    // setLoading(true)
    try {
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, options)
      setColaborador(data)
      setAlerta({})
    } catch (error) {
      console.log(error)
      setAlerta({ msg: error.response.data.msg , error: true})
    } finally {
      // setLoading(false)
    }
  }

  const agregarColaborador = async (user) => {
    try {
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,  user, options)

      setAlerta({ msg: data.msg })
      //SocketIO
      socket.emit('agregar colaborador', {...colaborador, proyecto: proyecto._id})
      
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
      console.log(error.response)
    }
  }

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
  }

  const eliminarColaborador = async () => {
    try {
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      console.log
      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id }, options)

      //SocketIO
      const infoColaborador = { idColaborador: colaborador._id, idProyecto: proyecto._id }
      socket.emit('eliminar colaborador', infoColaborador)
      
      setAlerta({ msg: data.msg })
      setColaborador({})
      setTimeout(() => {
        setAlerta({})
        handleModalEliminarColaborador()
      }, 1500);
    } catch (error) {
      console.log(error)
    }
  };

  const cambiarEstadoTarea = async (id) => {
    try {
      const token = sessionStorage.getItem('token')
      if(!token) return 
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, options)
      toast.success('Tarea actualizada!', {
        autoClose: 3000,
        pauseOnHover: false,
      })

      //Socket IO
      socket.emit('actualizar estado tarea', data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowModalBuscador = () => {
    setModalBuscador(!modalBuscador)
  }

  //SOCKET IO
  const submitAgregarTarea = (tarea) => {
    //agregando tarea al state
    const proyectoNew = {...proyecto}
    proyectoNew.tareas = [...proyectoNew.tareas, tarea]
    setProyecto(proyectoNew)
    setAlerta({ msg: 'Tarea agregada correctamente' })
    setTimeout(() => {
      setModalFormularioTarea(false)
      setTareaAccion({})
      setAlerta({})
    }, 1500);
  }

  const socketEliminarTarea = (tareaEliminada) => {
    // console.log(tarea)
    //Eliminando tarea en el state
    const proyectoNew = {...proyecto}
    proyectoNew.tareas = proyectoNew.tareas.filter(tareaState => tareaState._id !== tareaEliminada._id)
    setProyecto(proyectoNew)
  }

  const socketActualizarTarea = (tareaActualizada) => {
    console.log('actualizando tarea desde socket')
    //Actualizando tarea en el state
    const proyectoNew = {...proyecto}
    proyectoNew.tareas = proyectoNew.tareas.map(tareaState => tareaState._id === tareaActualizada._id ? tareaActualizada : tareaState)
    setProyecto(proyectoNew)
  }

  const socketActualizarEstadoTarea = (tareaEstadoActualizado) => {
    const proyectoActualizado = {...proyecto};
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tareaEstadoActualizado._id ? tareaEstadoActualizado : tareaState)
      setProyecto(proyectoActualizado)
      setAlerta({})
      setTareaAccion({})
  }

  const socketEliminarColaborador = (idColaborador) => {
    const proyectoActualizado = {...proyecto}
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== idColaborador)
      setProyecto(proyectoActualizado)
  }

  const socketAgregarColaborador = (colaborador) => {
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.colaboradores = [...proyectoActualizado.colaboradores, colaborador]
    setProyecto(proyectoActualizado)
    setColaborador({})
    setTimeout(() => {
      setAlerta({})
      navigate(`/proyectos/${proyecto._id}`)
    }, 1500);
    
  }

  const cerrarSesionProyectos = () => {
    setProyectos([])
    setProyecto({})
    setAlerta({})
  }

  const value = {
    proyectos,
    alerta,
    mostrarAlerta,
    submitProyecto,
    obtenerProyecto,
    loading,
    setProyecto,
    proyecto,
    eliminarProyecto,
    modalFormularioTarea,
    handleShowModalTarea,
    submitTarea,
    handleEditarTarea,
    tareaAccion,
    modalEliminarTarea,
    handleEliminarTarea,
    eliminarTarea,
    submitColaborador,
    colaborador,
    agregarColaborador,
    handleModalEliminarColaborador,
    modalEliminarColaborador,
    eliminarColaborador,
    cambiarEstadoTarea,
    modalBuscador,
    handleShowModalBuscador,
    submitAgregarTarea,
    socketEliminarTarea,
    socketActualizarTarea,
    socketActualizarEstadoTarea,
    cerrarSesionProyectos,
    socketEliminarColaborador,
    socketAgregarColaborador
  }
  return (
    <ProyectosContext.Provider value={value}>
      {children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosProvider