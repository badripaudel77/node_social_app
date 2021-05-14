import Home from './components/Home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
        <Router>
               <Switch>
                    <Route to='register' exact><Register /></Route>
                    <Route to='/login' exact><Login /></Route>
                    <Route to='/' exact><Home /></Route>
               </Switch>
        </Router>
  );
}

export default App;
