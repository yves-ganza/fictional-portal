import React, {useEffect, useState} from 'react'

import { hasJoined, getPosts } from '../../utils/contractUtils'
import Input from '../Input'
import Post from './Post'

export default function Posts({setStatus}){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
        .then(posts => {
            let reversed = [...posts].reverse()
            setPosts(reversed)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <div className='h-full px-4 flex flex-col md:flex-col-reverse'>
            {
                posts.length < 1 ?
                <h2 className='rounded px-6 py-5 bg-primary text-headline font-semibold'>No posts yet, be the first!</h2> :
                <ul className='scrollbar flex flex-col-reverse md:flex-col'>
                    { 
                        posts.map((post, i) => {
                            return <li key={i} className='w-full max-w-4xl'>   
                                        <Post post={post} />
                                    </li>
                        })
                    }
                </ul>
            }
            <Input setStatus={setStatus}/>
        </div>
    )
}