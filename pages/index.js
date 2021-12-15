import Head from 'next/head'
import { useEffect, useState } from 'react'
import {hasJoined, connectWallet, sendMessage, getUser } from '../utils/contractUtils'

import Header from '../components/Header'
import Input from '../components/Input'
import Posts from '../components/Posts'
import Register from '../components/Register'
import Alert from '../components/Alert'


export default function Home() {
  const [registered, setRegistered] = useState(false)
  const [account, setAccount] = useState()
  const [username, setUsername] = useState()
  const [avatar, setAvatar] = useState()
  const [status, setStatus] = useState('Loading: Please wait...')

  const load = async () => {
    try{
      const walletConnected = await connectWallet()
      if(!walletConnected) return
      setAccount(walletConnected)
      
      const userRegistered = await hasJoined()
      if(!userRegistered) {
        if(status === 'Loading: Please wait...') setStatus('')
        return
      }
      setRegistered(userRegistered)
  
      const user = await getUser()
      if(!user) return
      setUsername(user.username)
      setAvatar(user.profilePic)
      if(status === 'Loading: Please wait...') setStatus('')
    }catch(err){
      console.log(err)
      setStatus(`Error: ${err.message}`)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if(status){
    return <Alert status={status} setStatus={setStatus} />
  }

  return (
    <div className='h-full max-h-screen md:pt-8 overflow-y-auto md:min-w-[640px]'>
        {
          !registered ? 
          <Register setRegistered={setRegistered} setStatus={setStatus} account={account} setAccount={setAccount}/> :
          <Posts setStatus={setStatus}/>
        }
    </div>
  )
}