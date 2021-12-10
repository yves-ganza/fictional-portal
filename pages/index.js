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
  const [status, setStatus] = useState('')

  const load = async () => {
    try{
      const walletConnected = await connectWallet()
      if(!walletConnected) return
  
      const userRegistered = await hasJoined()
      if(!userRegistered) return
      setRegistered(userRegistered)
  
      const user = await getUser()
      if(!user) return
      setUsername(user.username)
    }catch(err){
      console.log(err)
      setStatus(`Error: ${err.message}`)
    }
  }

  useEffect(() => {
    load()
  }, [status])

  if(status){
    return <Alert status={status} setStatus={setStatus} />
  }

  return (
    <>
        {
          !registered ? <Register setRegistered={setRegistered} setStatus={setStatus} account={account}/> :
          <>
            <Header account={account} registered={registered} username={username}/>
            <Posts setStatus={setStatus}/>
          </>
        }
    </>
  )
}