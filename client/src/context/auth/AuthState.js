import React, { useReducer } from 'react'
import axios from '../../api/axios'
import AuthContext from './authContex'
import authReducer from './authReducer'
import { types } from '../types/types'
//import setAuthToken from '../../utils/setAuthToken'

  const AuthState = props => {
    const initialState = {
          token: localStorage.getItem('token')? localStorage.getItem('token') : null,
          isAuthenticated: null,
          user : null,
          loading: true,
          error: null
    }

  const [state, dispatch] = useReducer(authReducer, initialState);

   const loadUser = async () => {
     //console.log('is token present ' + localStorage.token); yes
    try {
     const res = await axios.get('/users/user', { headers: {"auth_token" : `${localStorage.token}`} })
     //console.log("user loaded data ", res.data);
      dispatch({
        type: types.USER_LOADED,
        payload: res.data //user
      });
    } 

    catch (err) {
      dispatch({ type: types.AUTH_ERROR });
    }
  };

  //Register User
  const register = async (formData) => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }};
    try {
        const res = await axios.post('/users/register', formData, config);
        dispatch({
                type: types.REGISTER_SUCCESS,
                payload: res
        }); 
        loadUser(); 

    } 
    catch (err) {
      dispatch({
        type: types.REGISTER_FAIL,
        payload: "User with that Email Already exist"
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/users/login', formData, config);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res
      })
      loadUser();
    } 
    catch (err) {
      dispatch({
        type: types.LOGIN_FAIL,
        payload : "Login Failed, Please check the credentials."
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: types.LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;