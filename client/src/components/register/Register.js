import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import AuthContext from '../../context/auth/authContex'

import styles from './Register.module.css'

const Register = () => {

    const history = useHistory();

    const authContext = useContext(AuthContext)
    const { register  } = authContext

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage ] = useState('')
   
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : null

    useEffect(() => {
        if(token) {
            history.push('/')
        }
    }, [token])

    const register_ = (e) => {
        e.preventDefault();
        const { error } = authContext
        setErrorMessage('')
        if(password !== confirmPassword) {
            setErrorMessage('* Two Passwords doesn\'t match *')
            return;
        }
        if(error) {
            setErrorMessage("* " + error + " *")
        }
        try {
            register({
                name,
                email,
                password
            })        } 
        catch (error) {
          setErrorMessage("* That User Already Exists *")     
        }
    }
    return (
        <div className={styles.register}>
           <form onSubmit={register_}>
                <label htmlFor="name">Name</label>
                <input className={styles.input} type="text" required id="name" name="name" placeholder="Your name.." 
                  onChange= {(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input className={styles.input} type="email" required id="email" name="email" placeholder="Your Email.." 
                  onChange= {(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input className={styles.input} type="password" required id="password" name="password" placeholder="Your password .." 
                       onChange= {(e) => setPassword(e.target.value)}
                />
               
                <label htmlFor="confirm_password">Confirm Password</label>
                <input className={styles.input} type="password" required id="confirm_password" name="confirm_password" placeholder="confirm Your password .." 
                        onChange= {(e) => setConfirmPassword(e.target.value)}
                />  
                <label htmlFor="error" style={{color  : 'red'}}>{errorMessage != null ? errorMessage : ''}</label>

                <button className={styles.submit} type="submit">Register Account</button>

               <Link to='/login'>
                    <input style ={{background: 'blue'}} className={styles.submit} type="button" value="Login Instead?" />
               </Link>
            </form>
        </div>
    )
}

export default Register
