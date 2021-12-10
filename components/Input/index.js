import React, { useState } from "react"

import {sendMessage} from '../../utils/contractUtils'

export default function Input({setStatus}){
    const [state, setState] = useState('')
    const [sent, setSent] = useState(false)

    const handleChange = (e) => {
        setState(e.target.value)
    }

    const handleSubmit = async (e) =>{

        try{
            setStatus('Posting: Please wait...')
            const res = await sendMessage(state)
            setStatus('Posting: Posted!')
            setState('')
            setStatus('')
        }catch(err){
            setStatus(`Error: ${err.message}`)
        }

    }
    return(
        <div className='w-full max-w-3xl mx-auto bottom-4  rounded bg-gray-800 flex justify-center items-center'>
            <input onChange={handleChange} type='text' value={state} className='flex-1 pl-6 py-5 rounded-l leading-normal focus:border-transparent focus:outline-none  ring-opacity-90 bg-gray-900 text-gray-400 ' placeholder='Start new post'/>
            <button onClick={handleSubmit} className='px-2 mx-2'>
                <img src='/send.svg' alt='send' className='w-6 h-6' />
            </button>
        </div>
    )
}