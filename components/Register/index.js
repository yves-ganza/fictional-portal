import React, { useState,useEffect } from "react"

import { join } from "../../utils/contractUtils"


export default function Register({setRegistered, setStatus}){
    const [account, setAccount] = useState('')
    const [walletConnected, setWalletConnected] = useState(false)
    const [username, setUsername] = useState('')

    const connectWallet = async(ethereum) => {
        if(!ethereum) setStatus('Ethereum not found!')
    
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            console.log('Connected to: ', accounts[0])
            setWalletConnected(true)
            setStatus('connected')
            return accounts[0]
        }catch(err){
            setWalletConnected(false)
            console.log(err)
            return false
        }
    }

    const checkWalletConnected = async () => {
        const {ethereum} = window
    
        if(!ethereum){
            setStatus('Ethereum not found!')
            return false
        }

        const accounts = await ethereum.request({method: 'eth_accounts'})

        if(accounts.length == 0) return false

        setWalletConnected(true)
        setAccount(accounts[0])

        console.log(`Connected to account: `, accounts[0])
        setStatus('')
        return true
    }

    const register = async (e) => {
        e.preventDefault()
        const connected = await checkWalletConnected()

        if(!connected){
            console.log('No connected account found!')
    
            const address = await connectWallet(ethereum)
            if(!address) return
    
            setWalletConnected(true)
            setAccount(address)     
        }
        //Ask contract to join
        if(!username){
            setStatus('Error: Please provide a unique username')
            return
        }

        try{
            setStatus('Registering: Please wait...')
            const success = await join(username)
            setStatus('Joined')
            setRegistered(true)            
        }
        catch(err){
            setStatus(`Error: ${err.message}`)
        }
    }

    const handleChange = (e) => e.preventDefault()

    useEffect(() => {
        let mounted = true
        mounted && checkWalletConnected()

        return () =>{
            mounted = false
        }
    }, [])

    return(
        <section className="flex flex-col gap-y-6 items-center w-full min-h-screen lg:flex-row lg:gap-x-16">
            <header className='text-headline text-center mt-12 lg:mt-0 lg:px-6 text-4xl font-bold lg:text-6xl'>Join Fictional Portal</header>
            <form className='bg-black bg-opacity-25 backdrop-filter backdrop-blur w-full sm:max-w-lg flex flex-col gap-4 pt-12 rounded px-4 text-primary md:min-w-primary' onSubmit={register}>
                <div>
                    <label className='block text-headline my-2' htmlFor='text-input'>Username</label>
                    <input id='text-input' className='py-3 pl-4 w-full  bg-gray-700 rounded' type='text' placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label className='block text-headline my-2' htmlFor='wallet-ad'>Wallet address</label>
                    <input id='wallet-ad' className='py-3 pl-4 w-full  bg-gray-700 rounded' onChange={handleChange} value={account} />
                </div>
                <button 
                    className='px-6 py-3 my-6 text-btn hover:animate-pulse  rounded bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700'
                    onClick={(e) => register(e)}
                >Join</button>
            </form>
        </section>
    )
}