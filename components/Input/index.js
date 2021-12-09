import React, { useState } from "react"

export default function Input(props){
    const [state, setState] = useState('')

    const handleChange = (e) => {
        setState(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        props.handleSubmit(state)
        setState('')
    }
    return(
        <div className='fixed bottom-4 right-0 left-0  pr-4 mx-2 gap-x-4 rounded bg-gray-800 flex justify-center items-center'>
            <input onChange={handleChange} type='text' value={state} className='flex-1 pl-6 py-5 rounded-l leading-normal focus:border-transparent focus:outline-none  ring-opacity-90 bg-gray-900 text-gray-400 ' placeholder='Start vibing...'/>
            <button onClick={handleSubmit}>
                <img src='/send.svg' alt='send' className='w-6 h-6' />
            </button>
        </div>
    )
}