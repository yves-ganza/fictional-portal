import { ethers } from 'ethers'
import ABI from './VibinPortal.json'

const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const abi = ABI.abi

export async function join(username){
    const {ethereum} = window

    if(!ethereum) return false

    try {
        
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer) 

        const joinTx = await contract.join(username)
        await joinTx.wait()
        
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

export async function hasJoined(){
    const {ethereum} = window

    if(!ethereum) return false

    try {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer)
        
        const hasJoined = await contract.hasJoined()

        console.log('User joined: ', hasJoined)

        return hasJoined

    }catch(err){
        console.log(err)
        return false
    }    
}

export async function getUser(){
    console.log('getting user ...')
    const {ethereum} = window

    if(!ethereum) throw new Error('Ethereum not found!')

    try {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer)
        
        const user = await contract.getUser()

        console.log(user)
        return user

    }catch(err){
        throw new Error(err)
    }    
}

export async function sendMessage(message){
    const {ethereum} = window

    if(!ethereum) throw new Error('Ethereum not found!')

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(address, abi, signer)

    const postTx = await contract.vibe(message)
    await postTx.wait()
    return true
}

export async function getPosts(){
    const {ethereum} = window

    if(!ethereum) throw new Error('Ethereum not found!')

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(address, abi, signer)

    const posts = await contract.getVibes()

    return posts
}

export async function connectWallet(){
    const {ethereum} = window

    if(!ethereum) throw new Error('Ethereum not found!')

    let accounts = await ethereum.request({method: 'eth_accounts'})
    console.log('Connected account: ', accounts[0])

    if(accounts.length != 0) return accounts[0]

    accounts = await ethereum.request({method: 'eth_requestAccounts'})
    console.log('Connected account: ', accounts[0])
    return accounts[0]
}