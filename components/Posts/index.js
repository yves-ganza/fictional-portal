import React, {useEffect, useState} from 'react'

import { hasJoined, getPosts } from '../../utils/contractUtils'
import Input from '../Input'

export default function Posts({setStatus}){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
        .then(posts => {
            console.log(posts)
            setPosts(posts)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <div className='min-w-3/4  mx-auto mb-8'>
            {
                posts.length < 1 ?
                <h2 className='rounded px-6 py-5 bg-primary text-headline font-semibold'>No posts yet, be the first!</h2> :
                <ul className='grid place-content-center'>
                    { 
                        posts.map((post, i) => {
                            const timestamp = new Date(post.timestamp.toNumber() * 1000).toString()
                            return <li key={i} className='w-full max-w-4xl'>   
                                        <article className='rounded p-2 md:p-6 mb-4 bg-primary'>
                                            <h3 className='text-headline font-semibold'>{post.username} - <span className='text-primary font-normal '>{timestamp}</span></h3>
                                            <hr/>
                                            <p className='text-primary mt-4'>{post.message}</p>
                                        </article>
                                    </li>
                        })
                    }
                </ul>
            }
            <Input setStatus={setStatus}/>
        </div>
    )
}