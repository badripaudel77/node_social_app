import React from 'react'

import styles from './Post.module.css'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded'

import moment from 'moment'

const Post = ({post}) => {
    return (
        <div className={styles.post}>
            {/* <img className={styles.avatar} src="/assets/person2.jpg" alt="avatar" /> */}
            <img className={styles.avatar} src={post.image} alt="avatar" />
           <div className={styles.post_container}>
                <div className={styles.top}> 
                   <div>
                        <span className={styles.username}>{post.name}</span>
                        <span className={styles.time}>{moment(post.created_date).format("DD MMM, YYYY")}</span>
                   </div>
                    <div><MoreHorizRoundedIcon/></div>
                </div>
                <span className={styles.post_desc}>{post.title}</span>
                <img className={styles.post_pic} src={post.image} alt="upload" />
                <div className={styles.like_container}>
                    <span className={styles.like}><ThumbUpRoundedIcon  /></span>
                    <span className={styles.like_text}>{post.likes.lenght>0? post.likes.lenght + ' likes' : '0 likes'}</span>
                </div>
           </div>
        </div>
    )
}

export default Post
