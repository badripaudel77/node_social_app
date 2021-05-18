import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import AuthContext from '../../context/auth/authContex'

import  styles from './Login.module.css'

const Login = () => {

    const history = useHistory();
    
    const authContext = useContext(AuthContext)
    const { login, isAuthenticated,error } = authContext

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage , setErrorMessage] = useState('')

    //let token = localStorage.getItem('token') ? localStorage.getItem('token') : null
  
    useEffect(() => {
        if(isAuthenticated) {
            history.push("/");
        }
    // eslint-disable-next-line
    }, [isAuthenticated])

    const login_ = (e) => {
        setErrorMessage('')
        e.preventDefault()

        if(password === null) {
            setErrorMessage('* Password Can\'t be empty *')
            return ;
        }
        if(error) {
            setErrorMessage('* ' + error + ' *')
        }
        try {
            login({
                email,
                password
            })} 
        catch (error) {
          setErrorMessage("* That User doesn't exist *")     
        }
    }

    return (
        <div className={styles.login}>
           <form onSubmit={login_}>
                <label htmlFor="email">Email</label>
                <input className={styles.input} type="email" required id="email" name="email" placeholder="Your Email.." 
                       onChange ={(e)=> setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input className={styles.input} type="password" required id="password" name="password" placeholder="Your password .." 
                       onChange ={(e)=> setPassword(e.target.value)}
                />
                <label htmlFor="error" style={{color  : 'red'}}>{errorMessage != null ? errorMessage : ''}</label>
  
               <button className={styles.submit} type="submit" >Login Now</button>
               
               <Link to='/register' >
                   <input style ={{background: 'blue'}} className={styles.submit} type="button" value="Register Instead ?" />
                </Link>
            </form>
        </div>
    )
}

export default Login
