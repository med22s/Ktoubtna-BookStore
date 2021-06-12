import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
     USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
      USER_REGISTER_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
      USER_UPDATE_PROFILE_REQUEST,
      USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL, USER_PROFILE_RESET} from '../Types/userTypes'
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












export const logout=()=>(dispatch)=>{
    localStorage.removeItem('user')
    dispatch({type:USER_PROFILE_RESET})
    dispatch({type:ORDER_PERSONAL_LIST_RESET})
    dispatch({type:USER_LOGOUT})
}