import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/spinner/Spinner";
import { useAuth } from "../hooks/useAuth"
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function RutaProtegida() {
  const { auth, loadingAuth } = useAuth();

  
  if(loadingAuth) 
  return <div className='mt-7 md:mt-0 w-full h-screen flex items-center justify-center'><Spinner /></div>
  return (
    <>
      <ToastContainer />
      {
        auth._id ? (
          <div className="bg-gray-100">
            <Header />
            <div className="md:flex">
              <Sidebar />
              <main className="flex-1 p-5">
                <Outlet />
              </main>
            </div>
          </div>
        ) : <Navigate to='/' />
      }
    </>
  )
}
