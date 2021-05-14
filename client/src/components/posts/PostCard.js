import React from 'react'

import styles from './PostCard.module.css'

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import VideocamIcon from '@material-ui/icons/Videocam'
import LocationOnIcon from '@material-ui/icons/LocationOn'

export const PostCard = () => {
    return (
        <div className={styles.postCard}>
            <div className={styles.top}>
                <img className = {styles.avatar} src="/assets/person2.jpg" alt="avatar" />
                <input type="text" className={styles.input} placeholder="Share what's on your mind" />
            </div>
            <div className={styles.icons}>
                <div className= {styles.icon}>
                    <span style={{color : 'green'}}><PhotoLibraryIcon /></span> <span className={styles.icon_text}>Photo</span>
                </div>
                <div className= {styles.icon}>
                    <span style={{color : 'orange'}}><VideocamIcon /></span> <span className={styles.icon_text}>Video</span>
                </div>
                <div className= {styles.icon}>
                    <span style={{color : 'purple'}}><LocationOnIcon /></span> <span className={styles.icon_text}>Location</span>
                </div>
                <div className= {styles.icon}>
                   <button type="button" className={styles.button} >Post</button>
                </div>
            </div>
        </div>
    )
}
