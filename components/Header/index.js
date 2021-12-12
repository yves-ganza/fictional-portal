import React from "react"

export default function Header({account, username}){

    let address = account?.toString()
    if(address) address = `${address.substr(0, 5)}...${address.substr(-3)}`

    return(
        <header className="flex justify-end h-header p-4">
            <h1 className="bg-gray-400 rounded text-center p-4">{username || address}</h1>  
        </header>
    )
}