import React from 'react'

import  styles from './Login.module.css'

const Login = () => {
    return (
        <div className={styles.login}>
           <form>
                <label htmlFor="email">Email</label>
                <input className={styles.input} type="email" required id="email" name="email" placeholder="Your Email.." />

                <label htmlFor="password">Password</label>
                <input className={styles.input} type="password" required id="password" name="password" placeholder="Your password .." />
  
               <input className={styles.submit} type="submit" value="Login Now" />
               
               <input style ={{background: 'blue'}} className={styles.submit} type="button" value="Register Instead ?" />
            </form>
        </div>
    )
}

export default Login
