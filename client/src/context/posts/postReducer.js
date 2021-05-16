import { types } from '../types/types';

export default (state, action) => {
    const token = localStorage.setItem('token', localStorage.token)
    switch(action.type) {  
      case types.GET_POSTS:
           return {
                    ...state,
                    ...action.payload,
                    posts : action.payload,
                    loading : false,
                    token : token,
           } 

    case types.GET_POSTS_ERROR : 
            return {
                ...state,
                ...action.payload,
                posts : null,
                loading : false,
                token : token,
            }
        default : 
            return state;    
    }
}