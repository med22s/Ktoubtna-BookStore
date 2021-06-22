import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
  USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL, USER_PROFILE_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL, GET_RESET_PASSWORD_TOKEN_SUCCESS, GET_RESET_PASSWORD_TOKEN_REQUEST, GET_RESET_PASSWORD_TOKEN_FAIL, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL} from '../Types/userTypes'
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

        const {data}=await axios.post('/api/auth/login',{email,password},config)

        
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('token', JSON.stringify(data.token))
        
    } catch (error) {

      console.log('error response',error.response)
      console.log('error',error)

      dispatch({

          type: USER_LOGIN_FAIL,
          payload:error.response && error.response.data.msg ? error.response.data.msg : error.message
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

        const {data}=await axios.post('/api/auth/register',{name,email,password},config)

        
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        
        
        //localStorage.setItem('user', JSON.stringify(data))
        
    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload:error.response && error.response.data.msg ? error.response.data.msg : error.message
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

        const {data}=await axios.get(`/api/users/${profile}`,config);
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
              : error.message,
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

      const {data}=await axios.patch(`/api/users/profile`,userData,config)

      
      
      dispatch({
          type:USER_UPDATE_PROFILE_SUCCESS,
          payload:data
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('user', JSON.stringify(data))
      
  } catch (error) {
      console.log('response :',error.response);
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
  
      const { data } = await axios.patch(`/api/users/${userUpdate._id}`, userUpdate, config)

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

  // export const GenerateTokenByRefreshToken=() => async (dispatch) =>{

  //   axios.interceptors.response.use(function(response){
  //     dispatch({type:ACCESS_TOKEN_VALID,payload:response})
  // },function(error){
  //     if(error.status===401){
  //       dispatch({type:USER_LOGOUT})
  //     }else{
  //         return  dispatch({type:ACCESS_TOKEN_VALID,payload:response})
  //     }
  // })

  // }
  

  export const forgetPassword=(email)=>async(dispatch)=>{
    try {
      dispatch({
        type: FORGET_PASSWORD_REQUEST,
      })
  
  
      const config = {
        headers: {
            'Content-Type':'application/json'
        }
      }
  
      const { data } = await axios.post(`/api/auth/forgetPassword`,email, config)
      dispatch({ type: FORGET_PASSWORD_SUCCESS ,payload:data})
    } catch (error) {
      dispatch({
        type: FORGET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message
      })
    }
  }



  export const getResetPasswordToken=(resetToken)=>async (dispatch)=>{

    try {

      dispatch({
        type:GET_RESET_PASSWORD_TOKEN_REQUEST
    })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data}=await axios.get(`/api/auth/resetPassword/${resetToken}`,config);
        dispatch({
            type:GET_RESET_PASSWORD_TOKEN_SUCCESS,
            payload:data
        })
        
    } catch (error) {

        dispatch({
            type: GET_RESET_PASSWORD_TOKEN_FAIL,
            payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : error.message,
        })
        
    }

}


export const passwordReset=(formData)=>async(dispatch)=>{
  try {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    })


    const config = {
      headers: {
          'Content-Type':'application/json'
      }
    }

    const { data } = await axios.post(`/api/auth/resetPassword`,formData, config)

    dispatch({ type: PASSWORD_RESET_SUCCESS ,payload:data})
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
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