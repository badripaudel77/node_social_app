import React, { useContext, useEffect, useState } from 'react'

import LeftSidebar from '../leftsidebar/LeftSidebar'
import { MainFeed } from '../mainfeed/MainFeed';
import Navbar from '../navbar/Navbar'
import RightSidebar from '../rightsidebar/RightSidebar'

import { useHistory } from 'react-router-dom'

import styles from './Home.module.css'

import AuthContext from '../../context/auth/authContex'

function Home() {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, user, loadUser } = authContext
  const history = useHistory();  
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : null

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if((!token || token === undefined) && !isAuthenticated) {
      return history.push('/login')
    }
    //console.log('useeffect');
    loadUser()
    // eslint-disable-next-line
  }, [token])
  
  const handleToggle = () => setToggle(value => !value)
  return (
        <>
        {/* {console.log(('user ? in home.js ' + user && user._id))}   */}
            <Navbar handleToggle= {handleToggle}/>
            <div className={styles.home_container}>
                 <LeftSidebar toggle = {toggle} handleToggle={handleToggle} />
                 <MainFeed />
                 <RightSidebar />
           </div>
        </>
  );
}

export default Home;
