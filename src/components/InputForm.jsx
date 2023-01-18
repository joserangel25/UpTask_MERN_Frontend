

export const InputForm = ({ type, etiqueta, state, setState, placeholder = '', id ='' }) => {

  return (
    <div className='my-5'>
      <label 
        className='uppercase font-bold text-gray-600 block' 
        htmlFor={id ?? etiqueta.toLowerCase()}
      >{etiqueta}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className='w-full mt-2 p-2 bg-gray-50 border rounded-xl outline-sky-700'
        id={id ?? etiqueta.toLowerCase()}
        name={id}
        value={state.id}
        onChange={(e) =>  setState(e)} 
      />
    </div>
  )
}
