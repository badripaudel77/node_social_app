import React from 'react'

import styles from './Post.module.css'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded'

const Post = () => {
    return (
        <div className={styles.post}>
            <img className={styles.avatar} src="https://pbs.twimg.com/profile_images/1275833339572654081/cTEdFTV9_400x400.jpg" alt="avatar" />
           <div className={styles.post_container}>
                <div className={styles.top}> 
                   <div>
                        <span className={styles.username}>John Doe</span>
                        <span className={styles.time}>12h</span>
                   </div>
                    <div><MoreHorizRoundedIcon/></div>
                </div>
                <span className={styles.post_desc}>Description : my first post</span>
                <img className={styles.post_pic} src="https://pbs.twimg.com/profile_images/1275833339572654081/cTEdFTV9_400x400.jpg" alt="upload" />
                <div className={styles.like_container}>
                    <span className={styles.like}><ThumbUpRoundedIcon  /></span>
                    <span className={styles.like_text}>you & 3 other like it.</span>
                </div>
           </div>
            
        </div>
    )
}

export default Post
