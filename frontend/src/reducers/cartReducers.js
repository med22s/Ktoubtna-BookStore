import {ADD_CART_ITEM,REMOVE_CART_ITEM,CART_ERROR, CART_SHIPPING_DETAILS, CART_PAYMENT_METHOD, CART_RESET} from '../Types/cartTypes'

export const cartReducer=(state={cartItems:[],shippingDetails: {}},action)=>{

    switch(action.type){
        case ADD_CART_ITEM:
            

            const item=action.payload
            const isExists=state.cartItems.find(i=>i.book===item.book)
            if(isExists){
                
                return {...state,cartItems:state.cartItems.map(i=>i.book===item.book ? item : i)}
            }else{
                
                return {...state,cartItems:[...state.cartItems,item]}
            }

        case REMOVE_CART_ITEM:
            
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.book !== action.payload),
            }

        case CART_SHIPPING_DETAILS:
            return {
                ...state,
                shippingDetails:action.payload
            }

        case CART_PAYMENT_METHOD:
            return {
                ...state,paymentMethod:action.payload
            }
        
        case CART_ERROR:
            return {...state,error:action.payload}
            case CART_RESET:
                return {}
        default:
            return state
    }
    
}