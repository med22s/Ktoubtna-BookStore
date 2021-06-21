import {ORDER_SAVE_REQUEST,ORDER_SAVE_SUCCESS,ORDER_SAVE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_FAIL, ORDER_PAYMENT_REQUEST,
    ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_RESET, ORDER_PERSONAL_LIST_REQUEST,
     ORDER_PERSONAL_LIST_RESET,
     ORDER_PERSONAL_LIST_SUCCESS,
     ORDER_PERSONAL_LIST_FAIL,
     ORDER_LIST_REQUEST,
     ORDER_LIST_SUCCESS,
     ORDER_LIST_FAIL,
     ORDER_LIST_RESET,
     ORDER_DELIVER_REQUEST,
     ORDER_DELIVER_SUCCESS,
     ORDER_DELIVER_FAIL,
     ORDER_DELIVER_RESET,
     ORDER_SAVE_RESET} from '../Types/orderTypes'



export const orderSaveReducer=(state={},action)=>{
 switch(action.type){
     case ORDER_SAVE_REQUEST:
         return {loading:true}
     case ORDER_SAVE_SUCCESS:
         return {loading:false,order:action.payload,saved:true}
     case ORDER_SAVE_FAIL:
         return {loading:false,error:action.payload}
    case ORDER_SAVE_RESET:
        return {}
     default:
         return state
 }
}



export const orderDetailsReducer = (
 state = { loading: true, orderBooks: [], shippingDetails: {} },
 action
) => {
 switch (action.type) {
   case ORDER_DETAILS_REQUEST:
     return {
       ...state,
       loading: true,
     }
   case ORDER_DETAILS_SUCCESS:
     return {
        loading: false,
        order: action.payload,
    }
   case ORDER_DETAILS_FAIL:
     return {
       loading: false,
       error: action.payload,
     }
   default:
     return state
 }
}



export const orderPaymentReducer = (state = {}, action) => {
 switch (action.type) {
   case ORDER_PAYMENT_REQUEST:
     return {
       loading: true
     }
   case ORDER_PAYMENT_SUCCESS:
     return {
       loading: false,
       success: true
     }
   case ORDER_PAYMENT_FAIL:
     return {
       loading: false,
       error: action.payload
     }
   case ORDER_PAYMENT_RESET:
     return {}
   default:
     return state
 }
}



export const orderListPersonalReducer = (state = { orders: [] }, action) => {
 switch (action.type) {
   case ORDER_PERSONAL_LIST_REQUEST:
     return {
       loading: true,
     }
   case ORDER_PERSONAL_LIST_SUCCESS:
     return {
       loading: false,
       orders: action.payload,
     }
   case ORDER_PERSONAL_LIST_FAIL:
     return {
       loading: false,
       error: action.payload,
     }
 
     case ORDER_PERSONAL_LIST_RESET:
         return {orders:[]}
   default:
     return state
 }
}


export const orderListReducer = (state = { orders: [] }, action) => {
 switch (action.type) {
   case ORDER_LIST_REQUEST:
     return {
       loading: true,
     }
   case ORDER_LIST_SUCCESS:
     return {
       loading: false,
       orders: action.payload.orders,
       pages: action.payload.pages,
       page: action.payload.pageNumber,
     }
   case ORDER_LIST_FAIL:
     return {
       loading: false,
       error: action.payload,
     }
 
     case ORDER_LIST_RESET:
         return {orders:[]}
   default:
     return state
 }
}


export const orderDeliverReducer = (state = {}, action) => {
 switch (action.type) {
   case ORDER_DELIVER_REQUEST:
     return {
       loading: true,
     }
   case ORDER_DELIVER_SUCCESS:
     return {
       loading: false,
       success: true,
     }
   case ORDER_DELIVER_FAIL:
     return {
       loading: false,
       error: action.payload,
     }
   case ORDER_DELIVER_RESET:
     return {}
   default:
     return state
 }
}