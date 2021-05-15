import { types } from '../types/types';

export default (state, action) => {
    switch(action.type) {  
      case types.REGISTER_SUCCESS:
      case types.LOGIN_SUCCESS:
           localStorage.setItem('token', action.payload.message);
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

        default : 
            return state;    
    }
}