import React from 'react'

import styles from './RightSidebar.module.css'

const RightSidebar = () => {
    return (
        <div className={styles.rightSidebar}>
            <div className={styles.pic_container}>
                <span>John and 2 of your other friends have birthday today.</span>
                <img className={styles.img} src="https://www.143greetings.com/birthday/images/birthday-cake-wishes-card.jpg" />
            </div>
            <div className={styles.online}>
                <span className={styles.title}>People Online</span>
                <div className={styles.user}>
                    <img className={styles.avatar} alt="online user" src="/assets/person1.jpg" />
                    <span className={styles.username}>Rina Doe</span>
                </div>
                <div className={styles.user}>
                    <img className={styles.avatar} alt="online user" src="/assets/person1.jpg" />
                    <span className={styles.username}>Rina Doe</span>
                </div>
                <div className={styles.user}>
                    <img className={styles.avatar} alt="online user" src="/assets/person1.jpg" />
                    <span className={styles.username}>Rina Doe</span>
                </div>
            </div>
        </div>
    )
}

export default RightSidebar
