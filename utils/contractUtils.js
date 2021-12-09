import { ethers } from 'ethers'
import ABI from './VibinPortal.json'

export async function Join(){
    const {ethereum} = window
    const abi = ABI.abi
    const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    console.log(address)

    if(!ethereum) return false

    try {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer) 

        const joinTx = await contract.join('Admin')
        const res = await joinTx.wait()
        
        return res
    }catch(err){
        console.log(err)
        return false
    }
}

export async function hasJoined(){
    const {ethereum} = window
    const abi = ABI.abi
    const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    console.log(address)

    if(!ethereum) return false

    try {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer)
        
        const hasJoined = await contract.hasJoined()

        console.log(hasJoined)
        return hasJoined

    }catch(err){
        console.log(err)
        return false
    }    
} 