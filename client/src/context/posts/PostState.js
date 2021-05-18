import React, { useReducer, useContext } from 'react'
import axios from '../../api/axios'
import PostContext from './postContext'
import postReducer from './postReducer'
import { types } from '../types/types'

const PostState = props => {

  const initialState = {
          token: localStorage.getItem('token')? localStorage.getItem('token') : null,
          loading: true,
          error: null,
          posts : [],
          current : null, // update .... will be prefilled
    }

    const [state, dispatch] = useReducer(postReducer, initialState);

    const getPosts = async () => {

        try {
            const res = await axios.get('/posts/60a0c3e298389616984b23c2', { headers: {"auth_token" : `${localStorage.token}`} })
            // console.log('data ' , res.data.message);
            dispatch({ type : types.GET_POSTS, payload  : res.data.message })
        } 
        catch (error) {
            dispatch({ type : types.GET_POSTS_ERROR, payload : "error fetching notes"})
        }
    }

    return (
        <PostContext.Provider
          value={{
            posts : state.posts,
            token  : state.token,
            loading: state.loading,
            error: state.error,
            current : state.current,
            getPosts,
          }}
        >
          {props.children}
        </PostContext.Provider>
      );
}

export default PostState