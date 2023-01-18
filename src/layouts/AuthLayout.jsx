import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <>
      <main className="container mx-auto p-5 flex justify-center items-center min-h-screen">
        <div className="md:w-2/3 lg:w-2/5">
          <Outlet />
        </div>

      </main>
    </>
  )
}

export default AuthLayout