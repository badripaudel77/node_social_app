import React from 'react'
import Post from '../posts/Post'
import { PostCard } from '../posts/PostCard'

import styles from './MainFeed.module.css'

export const MainFeed = () => {
    return (
        <div className = {styles.feed}>
            <PostCard />
            <Post />
            <Post />
            <Post />
        </div>
    )
}
