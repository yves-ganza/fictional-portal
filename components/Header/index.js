import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { getUser } from "../../utils/contractUtils"

export default function Header({}){
    const [username, setUsername] = useState('')
    const router = useRouter()
    const active = router.pathname

    useEffect(() => {
        !username && getUser()
        .then(user => {
            setUsername(user.username)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return(
        <header className="flex justify-between  p-6 md:flex-col md:mt-8 md:gap-y-8  md:justify-start md:pl-8 text-headline border-r">
            <Link href='/'>
                <a name = 'Home' className = {`md:flex md:gap-x-4 md:items-center ${active == '/' ? 'text-pink-700' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="hidden lg:inline">Portal</span>
                </a>
            </Link>
            <Link href='/dashboard'>
                <a name = 'Dashboard' className={`bg-transparent ${active == '/dashboard' ? 'text-pink-700' : 'border-white'}`}>
                    <span className={`w-8 h-8 border-2 ${active == '/dashboard' ? 'border-pink-700' : 'border-white'} rounded-full text-center p-2 mr-4`}>
                        {username[0]}
                    </span>
                    <span className="hidden lg:inline">Dashboard</span>
                </a>
                
            </Link>
        </header>
    )
}