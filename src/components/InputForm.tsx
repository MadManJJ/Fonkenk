import React from 'react'

const InputForm = ({onInputChange, labelText} : {onInputChange:Function, labelText:string}) => {
  return (
    <div>
        <label htmlFor={labelText} className="block text-sm/6 font-medium text-white">
            {labelText}
        </label>
        <div className="mt-2">
        <input
            id={labelText}
            name={labelText}
            type={labelText}
            required
            autoComplete={labelText}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            onChange={(e) => onInputChange(e.target.value)}
        />
        </div>
    </div>
  )
}

export default InputForm