import LeftSidebar from '../leftsidebar/LeftSidebar'
import { MainFeed } from '../mainfeed/MainFeed';
import Navbar from '../navbar/Navbar'
import RightSidebar from '../rightsidebar/RightSidebar'

import styles from './Home.module.css'

function Home() {
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
