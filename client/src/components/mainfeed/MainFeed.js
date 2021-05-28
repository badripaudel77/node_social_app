import React, { useContext, useEffect } from 'react'
import { PostCard } from '../posts/PostCard'

import { useHistory } from 'react-router-dom'
import styles from './MainFeed.module.css'

import PostContext from '../../context/posts/postContext'
import AuthContext from '../../context/auth/authContex'

export const MainFeed = () => {
    
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)

    const { getPosts, posts } = postContext
    const { user } = authContext
    const history = useHistory()

    let token = localStorage.getItem('token') ? localStorage.getItem('token') : null
    
    useEffect(() => {
       console.log(user!== undefined && user);
        // getPosts(user._id) id needs to be passed
        if((!token || token === undefined)){
            history.push("/login")
            return
        }
        getPosts()
    }, [])
    return (
        <div className = {styles.feed}>
        {/* {
        console.log('posts yes or no?' + posts && posts)
        } */}
            <PostCard />
            {/* {
                posts.map(post => {
                    return <Post post = {post} key={post._id}/>
                })
            } */}
        </div>
    )
}
