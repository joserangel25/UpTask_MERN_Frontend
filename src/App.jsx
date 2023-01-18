import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthProvider'
import ProyectosProvider  from './context/ProyectosProvider'

import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import ConfirmarCuenta from './pages/ConfirmarCuenta'
import DetalleProyecto from './pages/DetalleProyecto'
import EditarProyecto from './pages/EditarProyecto'
import Login from './pages/Login'
import NuevoColaborador from './pages/NuevoColaborador'
import NuevoPassword from './pages/NuevoPassword'
import NuevoProyecto from './pages/NuevoProyecto'
import OlvidePassword from './pages/OlvidePassword'
import Proyectos from './pages/Proyectos'
import Registro from './pages/Registro'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registro />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/proyectos' element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path='crear-proyecto' element={<NuevoProyecto />} />
              <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
              <Route path=':id' element={<DetalleProyecto />} />
              <Route path='editar/:id' element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
