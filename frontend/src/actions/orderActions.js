import axios from 'axios'
import {ORDER_SAVE_REQUEST,ORDER_SAVE_SUCCESS,ORDER_SAVE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL} from '../Types/orderTypes'




export const saveOrder=(order)=>async(dispatch,getState)=>{
    // request to the backend + send token 

    const {user}=getState().userLogin

    const config={
        headers:{'Content-Type':'application/json',
        Authorization:`Bearer ${user.token}`}
    }

    dispatch({type:ORDER_SAVE_REQUEST})

    try {
        const {data}=await axios.post('/api/orders',order,config)
        dispatch({type:ORDER_SAVE_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message
        dispatch({
        type: ORDER_SAVE_FAIL,
        payload: message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })
  
      const {user}=getState().userLogin

    const config={
        headers:{'Content-Type':'application/json',
        Authorization:`Bearer ${user.token}`}
    }
  
      const { data } = await axios.get(`/api/orders/${id}`, config)
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
        const message =
        error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message
        dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message
        })
    }
  }
