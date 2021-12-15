import { ethers } from 'ethers'

import ABI from './VibinPortal.json'

const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const abi = ABI.abi


function checkNetwork(){
    const { ethereum } = window
    if (!ethereum) throw new Error('Ethereum not found!')

    const chainId = ethereum.chainId
    if (chainId !== '0x4'){
      console.log(ethereum)
      throw new Error('Connect to Rinkeby Network!')
    }

    return ethereum
}

export async function join(username, avatar) {
  try {
    const ethereum = checkNetwork()
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer)

    if(!avatar) return false 
    const joinTx = await contract.join(username, avatar)
    await joinTx.wait() 
    return true
    
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

export async function hasJoined() {
  try {
    const ethereum = checkNetwork()
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer)

    console.log(contract)
    const hasJoined = await contract.hasJoined()

    console.log('User joined: ', hasJoined)

    return hasJoined
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

export async function getUser() {
  try {
    const ethereum = checkNetwork()
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer)

    const user = await contract.getUser()
    console.log(user)
    return user

  } catch (err) {
    throw new Error(err.message)
  }
}

export async function sendMessage(message) {
    try {
        const ethereum = checkNetwork()
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
      
        const contract = new ethers.Contract(address, abi, signer)
      
        const postTx = await contract.vibe(message)
        await postTx.wait()
        return true
    }catch(err) {
        throw new Error(err.message)
    }
}

export async function getPosts() {
    try{
        const ethereum = checkNetwork()
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(address, abi, signer)

        const posts = await contract.getVibes()

        return posts
    }catch(err){
        throw new Error(err.message)
    }
}

export async function connectWallet() {
    try {
        const ethereum = checkNetwork()      
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Connected account: ', accounts[0])
        return accounts[0]
    }catch(err) {
        throw new Error(err.message)
    }
}
