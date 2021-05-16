import Home from './components/Home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AuthState from './context/auth/AuthState'
import PostState from './context/posts/PostState'

function App() {
 
  return (
    <AuthState>
        <PostState>
            <Router>
                  <Switch>
                        <Route path='/register' exact><Register /></Route>
                        <Route path='/login' exact><Login /></Route>
                        <Route path='/' exact><Home /></Route>
                  </Switch>
            </Router>
        </PostState>
    </AuthState>
  );
}

export default App;
