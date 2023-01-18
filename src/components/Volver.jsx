import { useNavigate } from "react-router-dom"

export default function Volver() {
  const navigate = useNavigate();
  return (
    <div>
      <button 
        type='button'
        onClick={() => navigate(-1)}
        className='my-4 font-bold text-sky-600 text-sm hover:cursor-pointer'
      > 🔚 Volver</button>
    </div>
  )
}
