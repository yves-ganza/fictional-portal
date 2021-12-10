import Head from 'next/head'
import { useEffect, useState } from 'react'
import {hasJoined, connectWallet, sendMessage, getUser } from '../utils/contractUtils'

import Header from '../components/Header'
import Input from '../components/Input'
import Posts from '../components/Posts'
import Register from '../components/Register'


export default function Home() {
  const [registered, setRegistered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [account, setAccount] = useState()
  const [username, setUsername] = useState()

  if(!mounted){
    hasJoined()
    .then(bool => {
      console.log(bool)
      setRegistered(bool)
    })

    connectWallet()
    .then(account => setAccount(account))
    .catch(err => console.log(err))

    getUser()
    .then( user => {
      setUsername(user.username)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black px-4 flex flex-col justify-between">
      {
        !registered ? <Register setRegistered={setRegistered}/> :
        <>
          <Header account={account} joined={registered} username={username}/>
          <Posts />
        </>
      }
    </div>
  )
}