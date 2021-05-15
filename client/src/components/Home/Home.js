import React, { useContext, useEffect } from 'react'

import LeftSidebar from '../leftsidebar/LeftSidebar'
import { MainFeed } from '../mainfeed/MainFeed';
import Navbar from '../navbar/Navbar'
import RightSidebar from '../rightsidebar/RightSidebar'

import { useHistory } from 'react-router-dom'

import styles from './Home.module.css'

import AuthContext from '../../context/auth/authContex'



function Home() {
  const authContext = useContext(AuthContext)
  const { isAuthenticated } = authContext
  const history = useHistory();
  
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : null
  
  useEffect(() => {
    if(!token) {
      return history.push('/login')
    }
    authContext.loadUser() 
    // eslint-disable-next-line
  }, [token])

  return (
        <>
            <Navbar />
            <div className={styles.home_container}>
                <LeftSidebar />
                 <MainFeed />
                <RightSidebar />
           </div>
        </>
  );
}

export default Home;
