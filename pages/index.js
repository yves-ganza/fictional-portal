import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Join, hasJoined } from '../utils/contractUtils'

import Header from '../components/Header'
import Input from '../components/Input'
import Posts from '../components/Posts'


export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [account, setAccount] = useState()
  const [auth, setAuth] = useState(false)
  const [status, setStatus] = useState('')

  const checkIfJoined = async() => {
      const joined = await hasJoined()
      console.log(joined)
      setAuth(joined)
  }

  const handleJoin = async () => {
    const re = await Join()
    setAuth(re)
  }

  const connectWallet = async(ethereum) => {
    if(!ethereum) setStatus('Ethereum not found!')

    try {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'})
      console.log('Connected to: ', accounts[0])
      setAccount(account[0])
      setStatus('')
      await checkIfJoined()
    }catch(err){
      setStatus('Failed to connected wallet!')
      console.log(err)
    }
  }

  const checkWalletConnected = async () => {
    const {ethereum} = window

    if(!ethereum){
      setStatus('Ethereum not found!')
      return 
    }
    const accounts = await ethereum.request({method: 'eth_accounts'})

    if(accounts.length == 0){
      setStatus('No authorized account found!')
      console.log('Connecting to an account...')
      await connectWallet(ethereum)
      return 
    }

    checkIfJoined()
    setIsWalletConnected(true)
    setAccount(accounts[0])
    console.log(`Connected to account: `, accounts[0])
    return setStatus('')
  }

  const handleInput = (msg) => {
    console.log(msg)
  }

  useEffect(() => {
    checkWalletConnected()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <Header account={account} status={status} joined={auth} onJoin={handleJoin}/>
      <Input handleSubmit={handleInput}/>
      <Posts />
    </div>
  )
}