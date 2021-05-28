import { types } from '../types/types';

export default (state, action) => {
    switch(action.type) {  
     case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : action.payload, // user
              }
    
    case types.LOGIN_SUCCESS:   
            //console.log('token when login success : ' + action.payload.data.token) // ye token has come
            localStorage.setItem('token', action.payload.data.token)
            return {
                     ...state,
                     ...action.payload,
                     user : action.payload,
                     isAuthenticated : true,
                     loading : false,
                     token: localStorage.getItem('token') ? localStorage.getItem('token') : null
                 }      
      
    case types.REGISTER_SUCCESS:
          // console.log('token register success : ' + action.payload) // token has come yeah
           localStorage.setItem('token', action.payload)
           return {
                    ...state,
                    ...action.payload,
                    user : action.payload,
                    isAuthenticated : true,
                    loading : false,
                }

        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
           localStorage.removeItem('token');              
           return {
                    ...state,
                    isAuthenticated : false,
                    token : null,
                    loading : false,
                    error : action.payload, // { "error" : }
                } 
               
                case types.LOGOUT:
                    localStorage.removeItem('token')
                    return {
                        ...state,
                        isAuthenticated : false,
                        token : null,
                        loading : false,
                        user : null,
                    } 

        default : 
            return state;    
    }
}