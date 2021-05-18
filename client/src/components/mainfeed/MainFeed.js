import React, { useContext, useEffect } from 'react'
import Post from '../posts/Post'
import { PostCard } from '../posts/PostCard'

import styles from './MainFeed.module.css'

import PostContext from '../../context/posts/postContext'
import AuthContext from '../../context/auth/authContex'

export const MainFeed = () => {
    
    const postContext = useContext(PostContext)
    const authContext = useContext(AuthContext)

    const { getPosts, posts } = postContext
    const { user } = authContext
    
    useEffect(() => {
        alert('auth ? user mainfeed :  ' + user && user) // has null value
        // getPosts(user._id) id needs to be passed
        getPosts()
    }, [])
    return (
        <div className = {styles.feed}>
        {/* {
        console.log('posts yes or no?' + posts && posts)
        } */}
            <PostCard />
            {
                posts.map(post => {
                    return <Post post = {post} key={post._id}/>
                })
            }
        </div>
    )
}
