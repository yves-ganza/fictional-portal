import React from 'react'

export default function Post({post}){
    const date = new Date(post.timestamp.toNumber() * 1000).toDateString()
    const time = new Date(post.timestamp.toNumber() * 1000).toTimeString().slice(0,5)

    return(
        <article className='rounded p-2 md:p-6 mb-4 bg-primary'>
            <h3 className='text-headline font-semibold'>{post.username} - <span className='text-primary font-normal '>{date} at {time}</span></h3>
            <hr/>
            <p className='text-primary mt-4'>{post.message}</p>
        </article>
    )
}