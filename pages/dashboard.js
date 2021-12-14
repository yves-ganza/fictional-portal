import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { getUser, connectWallet } from '../utils/contractUtils'

export default function Dashboard(){
    const [wallet, setWallet] = useState()
    const [username, setUsername] = useState()

    useEffect(() => {
        connectWallet()
        .then(address => {
            setWallet(address)
        })
        .catch(err => {
            console.log(err)
        })

        getUser()
        .then(user => {
            setUsername(user.username)
        }).catch(err => {
            console.log(err)
        })
    }, [wallet, username])
    return(
        <div className = 'mx-8 md:my-auto px-4 rounded-md bg-gray-900 opacity-90'>
            <div className='py-4'>
                <p className = 'text-headline font-bold break-words'>Wallet address:</p>
                <span className = 'overflow-x-auto py-2 pl-2 block bg-gray-500 rounded-md font-semibold whitespace-nowrap'>{wallet || '-'}</span>                
            </div>
            <div className='py-4'>
                <p className = 'text-headline font-bold break-words'>Username:</p>
                <span className = 'overflow-x-auto py-2 pl-2 block bg-gray-500 rounded-md font-semibold'>{username || '-'}</span>
            </div>
        </div>
    )
}