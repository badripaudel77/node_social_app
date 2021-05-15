import React from 'react'
import { OnlineUser } from '../online/OnlineUser'

import styles from './RightSidebar.module.css'

const RightSidebar = () => {
    return (
        <div className={styles.rightSidebar}>
            <div className={styles.pic_container}>
                <span>John and 2 of your other friends have birthday today.</span>
                <img alt="user" className={styles.img} src="https://www.143greetings.com/birthday/images/birthday-cake-wishes-card.jpg" />
            </div>
            <span className={styles.title}>People Online</span>
            <OnlineUser />
            <OnlineUser />
            <OnlineUser />
            <OnlineUser />
            <OnlineUser />
            <OnlineUser />
        </div>
    )
}

export default RightSidebar
