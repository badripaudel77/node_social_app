import React, { useContext, useEffect, useState } from 'react'
import Post from '../posts/Post'
import { PostCard } from '../posts/PostCard'

import styles from './MainFeed.module.css'

import PostContext from '../../context/posts/postContext'

export const MainFeed = () => {
    
    const postContext = useContext(PostContext)

    const { getPosts, posts } = postContext

    useEffect(() => {
       getPosts()
       console.log('posts ' + posts);
    }, [])
    return (
        <div className = {styles.feed}>
            <PostCard />
            <Post />
            <Post />
            <Post />
        </div>
    )
}
