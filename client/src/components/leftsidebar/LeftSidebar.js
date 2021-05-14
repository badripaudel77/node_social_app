import React from 'react'

import styles from './LeftSidebar.module.css'

import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LeftSidebar = () => {
    return (
            <div className = {styles.leftSidebar}>
                <div className={styles.item}>
                    <HomeRoundedIcon className={styles.icon}/> <span className={styles.text}>Home</span>
                </div>
                <div className={styles.item}>
                    <GroupRoundedIcon className={styles.icon} /> <span className={styles.text} >People</span>
                </div>
                <div className={styles.item}>
                    <AnnouncementRoundedIcon className={styles.icon} /> <span className={styles.text} >News</span>
                </div>
                <div className={styles.item}>
                    <BookmarkBorderRoundedIcon className={styles.icon} /> <span className={styles.text} >Bookmarks</span>
                </div>
                <div className={styles.item}>
                    <NotificationsNoneIcon  className={styles.icon} /> <span className={styles.text} >Account Status</span>
                </div>
                <div className={styles.item}>
                    <ExitToAppIcon className={styles.icon} /> <span className={styles.text} >Logout</span>
                </div>
                <div className={styles.item}>
                    <UnfoldMoreIcon className={styles.icon} /> <span className={styles.text}>More</span>
                </div>
            </div>
    )
    
}

export default LeftSidebar