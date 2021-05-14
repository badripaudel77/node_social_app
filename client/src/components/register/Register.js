import React from 'react'

import  styles from './Register.module.css'

const Register = () => {
    return (
        <div className={styles.register}>
           <form>
                <label htmlFor="email">Email</label>
                <input className={styles.input} type="email" required id="email" name="email" placeholder="Your Email.." />

                <label htmlFor="password">Password</label>
                <input className={styles.input} type="password" required id="password" name="password" placeholder="Your password .." />
               
                <label htmlFor="confirm_password">Confirm Password</label>
                <input className={styles.input} type="password" required id="confirm_password" name="confirm_password" placeholder="confirm Your password .." />
  
                <label htmlFor="bio">Bio</label>
                <input className={styles.input} type="text" required id="bio" name="bio" placeholder="Your short bio..." />
                 
               <input className={styles.submit} type="submit" value="Register Account" />

               <input style ={{background: 'blue'}} className={styles.submit} type="button" value="Login Instead?" />
            </form>
        </div>
    )
}

export default Register
