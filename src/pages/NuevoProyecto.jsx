import FormularioProyecto from "../components/FormularioProyecto"

export default function NuevoProyecto() {
  return (
    <>
      <h1 className='text-4xl font-black'>Nuevo Proyecto</h1>

      <div className='mt-5 flex flex-col justify-center bg-white'>
        <FormularioProyecto />
      </div>
    </>
  )
}
