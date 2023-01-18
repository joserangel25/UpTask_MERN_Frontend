import './Spinner.css'

export default function Spinner() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
      <p className='mt-5 text-center text-sky-800 font-bold'>Cargando...</p>
    </div>
  )
}
