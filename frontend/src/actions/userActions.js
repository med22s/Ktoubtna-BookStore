import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
     USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
      USER_REGISTER_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
      USER_UPDATE_PROFILE_REQUEST,
      USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL, USER_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL} from '../Types/userTypes'
      import {ORDER_PERSONAL_LIST_RESET} from '../Types/orderTypes'
import axios from 'axios'



export const loginUser=(email,password)=>async (dispatch)=>{

    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data}=await axios.post('/api/users/login',{email,password},config)

        
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        
        localStorage.setItem('user', JSON.stringify(data))
        
    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })
        
    }

}


export const registerUser=(name,email,password)=>async (dispatch)=>{

    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data}=await axios.post('/api/users',{name,email,password},config)

        
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        
        localStorage.setItem('user', JSON.stringify(data))
        
    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })
        
    }

}

export const getUserProfile=(profile)=>async (dispatch,getState)=>{

    try {

        const {user}=getState().userLogin

        dispatch({
            type: USER_PROFILE_REQUEST
        })

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.get(`/api/users/${profile}`,config)

        
        
        dispatch({
            type:USER_PROFILE_SUCCESS,
            payload:data
        })
        
    } catch (error) {

        dispatch({
            type: USER_PROFILE_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })
        
    }

}



export const updateUserProfile=(userData)=>async (dispatch,getState)=>{

    try {

        const {user}=getState().userLogin

        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`
            }
        }

        const {data}=await axios.put(`/api/users/profile`,userData,config)

        
        
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
        
    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message
        })
        
    }

}


export const getUsersList = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const {user}=getState().userLogin
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users`, config)
  
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }


  export const deleteUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })
  
      const {user}=getState().userLogin
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }
  
    await axios.delete(`/api/users/${id}`, config)
  
      dispatch({ type: USER_DELETE_SUCCESS })
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }


  export const updateUser = (userUpdate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      })
  
      const {user}=getState().userLogin
  
      const config = {
        headers: {
            'Content-Type':'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
  
      const { data } = await axios.put(`/api/users/${userUpdate._id}`, userUpdate, config)

      console.log(data)
  
      dispatch({ type: USER_UPDATE_SUCCESS })
  
      dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
      })
    }
  }









export const logout=()=>(dispatch)=>{
    localStorage.removeItem('user')
    dispatch({type:USER_PROFILE_RESET})
    dispatch({type:ORDER_PERSONAL_LIST_RESET})
    dispatch({type:USER_LIST_RESET})
    dispatch({type:USER_LOGOUT})
}