import {ORDER_SAVE_REQUEST,ORDER_SAVE_SUCCESS,ORDER_SAVE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL} from '../Types/orderTypes'



export const orderSaveReducer=(state={},action)=>{
    switch(action.type){
        case ORDER_SAVE_REQUEST:
            return {loading:true}
        case ORDER_SAVE_SUCCESS:
            return {loading:false,order:action.payload,saved:true}
        case ORDER_SAVE_FAIL:
            return {loading:false,error:action.payload}
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