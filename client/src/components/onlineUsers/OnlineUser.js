import React from 'react'
import styles from './OnlineUser.module.css'

export const OnlineUser = () => {
    return (
        <>
             <div className={styles.online}>
                <div className={styles.user}>
                    <img className={styles.avatar} alt="online user" src="/assets/person1.jpg" />
                    <span className={styles.username}>Rina Doe</span>
                    <button type="button" className={styles.follow_button}>Follow</button>
                </div>
            </div>
        </>
    )
}
