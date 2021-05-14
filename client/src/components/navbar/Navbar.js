import React from 'react'

import styles from './Navbar.module.css'

import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/People'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'

const Navbar = () => {
    return (
        <div className={styles.header}>
                <div className={styles.header_logo}>
                    <span>Social App</span>
                </div>
                <div className={styles.header_searchbar}>
                    <span className={styles.header_search_icon}><SearchIcon /></span>
                    <input  className={styles.header_input} type="text" placeholder="Search Something ... " name="search" />
                </div>
                    <div className={styles.header_links}>
                        <span className={styles.header_link}>link</span>
                        <span className={styles.header_link}>link</span>
                    </div>
                    <div className={styles.header_icons}>
                        <span className={styles.header_icon}><PeopleIcon /><span className={styles.header_icons_badge}>2</span></span>
                        <span className={styles.header_icon}><ChatBubbleOutlineIcon /><span className={styles.header_icons_badge}>2</span></span>
                        <span className={styles.header_icon}><NotificationsNoneIcon /><span className={styles.header_icons_badge}>2</span></span>
                    </div>
                    <div className={styles.header_profile}>
                        <img className={styles.header_avatar} src="/assets/person1.jpg" alt="profile" />
                    </div>
                </div>
    )
}

export default Navbar
