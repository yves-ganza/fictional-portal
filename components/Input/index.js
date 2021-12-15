import React, { useState } from "react"
import { useRouter } from "next/router"

import {sendMessage} from '../../utils/contractUtils'

export default function Input({setStatus}){
    const [state, setState] = useState('')
    const [sent, setSent] = useState(false)
    const router = useRouter()

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
            router.push('/')
        }catch(err){
            setStatus(`Error: ${err.message}`)
        }

    }
    const handleUpload = (e) => {
        const files = e.target.files
        console.log(files[0])
    }
    return(
        // <div className='fixed bottom-8 right-8 text-headline'>
        //     <div className='hidden'>
        //         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        //         </svg>
        //     </div>
        // </div>
        <div className='w-full max-w-4xl md:mb-8 rounded flex justify-center bg-gray-900 items-center'>
            <input onChange={handleChange} type='text' value={state} className='bg-gray-900 flex-1 pl-6 py-5 rounded-l leading-normal focus:border-transparent focus:outline-none  ring-opacity-90 bg-gray-900 text-gray-400 ' placeholder='Start new post'/>
            {/* <input type='file' onChange={handleUpload}/>  */}
            <button onClick={handleSubmit} className='px-4'>
                <img src='/send.svg' alt='send' className='w-6 h-6' />
            </button>
        </div>
    )
}