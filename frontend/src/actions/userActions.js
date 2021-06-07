import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL} from '../Types/userTypes'
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