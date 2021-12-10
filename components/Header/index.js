import React from "react"
import { useEffect, useState } from "react"
import { Join, hasJoined } from "../../utils/contractUtils"

export default function Header({account, username, joined, onJoin}){

    let address = account?.toString()
    if(address) address = `${address.substr(0, 5)}...${address.substr(-3)}`

    return(
        <header className="flex justify-end">
            {
                joined ? 
                <h1 className="bg-gray-400 rounded m-4 text-center p-4">{username || address}</h1> :
                <button 
                    className='px-6 py-4 m-4 rounded bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700'
                    onClick={() => onJoin()}
                >Join the Network</button>
            }    
        </header>
    )
}