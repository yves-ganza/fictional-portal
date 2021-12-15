import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { getUser, connectWallet } from '../utils/contractUtils'

export default function Dashboard(){
    const [wallet, setWallet] = useState()
    const [username, setUsername] = useState()
    const [avatar, setAvatar] = useState()

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
            setAvatar(user.profilePic)
        }).catch(err => {
            console.log(err)
        })
    }, [wallet, username])
    return(
        <div className = 'mx-8 md:my-auto max-h-[640px] max-w-[640px] px-4 rounded-md bg-gray-900 opacity-90'>
            {   
                avatar?.path &&
                <div className='aspect-square max-w-[50%] max-h-[50%] mx-auto m-4'>
                    <img src={`https://ipfs.infura.io/ipfs/${avatar.path}`} alt='avatar' className='w-full h-full rounded-full'/>
                </div>
            }
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