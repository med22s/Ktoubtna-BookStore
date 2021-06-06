import {ADD_CART_ITEM,REMOVE_CART_ITEM,CART_ERROR} from '../Types/cartTypes'

export const cartReducer=(state={cartItems:[]},action)=>{

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
        
        case CART_ERROR:
            return {...state,error:action.payload}

        default:
            return state
    }
    
}