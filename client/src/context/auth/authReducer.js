import { types } from '../types/types';

export default (state, action) => {
    switch(action.type) {  
     case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : action.payload,
              }
      case types.REGISTER_SUCCESS:
      case types.LOGIN_SUCCESS:

        //   console.log('token when login / register suces : ' + action)
           localStorage.setItem('token', action.payload.data.token)
           return {
                    ...state,
                    ...action.payload,
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
                    } 

        default : 
            return state;    
    }
}