import axios from 'axios'
import {ORDER_SAVE_REQUEST,ORDER_SAVE_SUCCESS,ORDER_SAVE_FAIL, ORDER_DETAILS_REQUEST,
     ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, 
     ORDER_PERSONAL_LIST_REQUEST,
     ORDER_PERSONAL_LIST_SUCCESS,
     ORDER_PERSONAL_LIST_FAIL,
     ORDER_LIST_REQUEST,
     ORDER_LIST_SUCCESS,
     ORDER_LIST_FAIL,
     ORDER_DELIVER_REQUEST,
     ORDER_DELIVER_SUCCESS,
     ORDER_DELIVER_FAIL} from '../Types/orderTypes'




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
      console.log(data);
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







export const payOrder = (id, paymentResult) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: ORDER_PAYMENT_REQUEST
      })
  
    const {user}=getState().userLogin

    const config={
        headers:{'Content-Type':'application/json',
        Authorization:`Bearer ${user.token}`}
    }
  
      const { data } = await axios.patch(
        `/api/orders/${id}/payment`,
        paymentResult,
        config
      )
  
      dispatch({
        type: ORDER_PAYMENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_PAYMENT_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }


  export const getListPersonalOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PERSONAL_LIST_REQUEST,
      })
  
      const {user}=getState().userLogin

    const config={
        headers:{
        Authorization:`Bearer ${user.token}`}
    }
  
      const { data } = await axios.get(`/api/orders/myorders`, config)
  
      dispatch({
        type: ORDER_PERSONAL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_PERSONAL_LIST_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }

  export const getListOrders = (pageNumber = '') => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })
  
      const {user}=getState().userLogin

    const config={
        headers:{
        Authorization:`Bearer ${user.token}`}
    }
  
      const { data } = await axios.get(`/api/orders/?pageNumber=${pageNumber}`, config)
      console.log(data);
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message,
      })
    }
  }



  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      })
  
      const {
        userLogin: { user },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      const { data } = await axios.patch(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      )
  
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
