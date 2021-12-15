import React, { useState,useEffect } from "react"

import { join } from "../../utils/contractUtils"
import ipfs from '../../utils/db'

export default function Register({setRegistered, setStatus, account}){
    const [walletConnected, setWalletConnected] = useState(false)
    const [address, setAddress] = useState(account)
    const [username, setUsername] = useState('')
    const [file, setFile] = useState('')


    const connectWallet = async(ethereum) => {
        if(!ethereum) setStatus('Ethereum not found!')
    
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            console.log('Connected to: ', accounts[0])
            setWalletConnected(true)
            setStatus('')
            setAddress(accounts[0])
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
        setAddress(accounts[0])
        setStatus('')
        console.log(`Connected to account: `, accounts[0])
        return true
    }

    const register = async (e) => {
        e.preventDefault()
        const connected = await checkWalletConnected()

        if(!connected){
            console.log('No connected account found!')
    
            const ad = await connectWallet(ethereum)
            if(!ad) return
    
            setWalletConnected(true)
            setAddress(ad)     
        }

        //Ask contract to join
        if(!username){
            setStatus('Error: Please provide a unique username')
            return
        }

        try{
            setStatus('Registering: Please wait...')
            if(!file){
                const fileData = await ipfs.add(file)
                console.log(fileData)
                const success = await join(username, {path: '', cid: '', size: ''})
                setStatus('Joined')
                setRegistered(true) 
                return            
            }                
            const fileData = await ipfs.add(file)
            console.log(fileData)
            const success = await join(username, {path: fileData.path, cid: fileData.cid, size: fileData.size})
            setStatus('Joined')
            setRegistered(true) 
        }
        catch(err){
            setStatus(`Error: ${err.message}`)
        }
    }

    const handleChange = (e) => e.preventDefault()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    useEffect(() => {
        checkWalletConnected()
    }, [address])

    return(
        <section className="grid  justify-center lg:grid-flow-col lg:auto-cols-max lg:justify-between lg:px-8 w-full max-w-7xl mx-auto h-fixed">
            <div className='text-headline text-center lg:text-left h-full justify-center lg:mt-0 lg:justify-self-start text-4xl font-bold lg:text-6xl'>
                <header className="lg:-mt-16">Join <span className="lg:block">Fictional Portal</span></header>
            </div>
            <div className="lg:place-self-center">
                <form className='bg-black bg-opacity-25 backdrop-filter backdrop-blur w-full sm:w-96 flex flex-col gap-4 pt-12 rounded px-4 text-primary lg:max-w-primary' onSubmit={register}>
                    <div>
                        <label className='block text-headline my-2' htmlFor='text-input'>Username</label>
                        <input id='text-input' className='block py-3 pl-4 w-full  bg-gray-700 rounded' type='text' placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label className='block text-headline my-2' htmlFor='file-input'>Avatar</label>
                        <input id='file-input' onChange={handleFileChange} className='block py-3 pl-4 w-full  bg-gray-700 rounded' type='file'/>
                    </div>
                    <div>
                        <label className='block text-headline my-2' htmlFor='wallet-ad'>Wallet address</label>
                        <input id='wallet-ad' className='block py-3 pl-4 w-full  bg-gray-700 rounded' onChange={handleChange} value={account || address} />
                    </div>
                    <button 
                        className='px-6 py-3 my-6 text-btn hover:animate-pulse  rounded bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700'
                        onClick={(e) => register(e)}
                    >Join</button>
                </form>
            </div>
        </section>
    )
}