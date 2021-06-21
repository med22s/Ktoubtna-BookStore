import {ADD_CART_ITEM,REMOVE_CART_ITEM,CART_ERROR, CART_SHIPPING_DETAILS, CART_PAYMENT_METHOD} from '../Types/cartTypes'
import axios from 'axios'


export const addCartItem=(id,quantity)=>async(dispatch,getState)=>{

    try {
        const {data}=await axios.get(`/api/books/${id}`)
        dispatch({
            type:ADD_CART_ITEM,
            payload:{
                book:data._id,
                name:data.name,
                image:data.imageUrl,
                price:data.price,
                numberInStock:data.numberInStock,
                quantity
            }
        })

        localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        dispatch({
            type:CART_ERROR,
            payload:error.response && error.response.data.msg ? error.response.data.msg : error.message
        })
    }
}




export const removeCartItem=(id)=>(dispatch,getState)=>{
    
    dispatch({type:REMOVE_CART_ITEM,payload:id})

    localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))
}



export const saveShippingDetails=(shippingInfo)=>(dispatch,getState)=>{


    dispatch({type:CART_SHIPPING_DETAILS,payload:shippingInfo})

    localStorage.setItem('shipping',JSON.stringify(getState().cart.shippingDetails))

}


export const savePaymentMethod=(paymentMethod)=>(dispatch,getState)=>{


    dispatch({type:CART_PAYMENT_METHOD,payload:paymentMethod})

    localStorage.setItem('paymentMethod',JSON.stringify(getState().cart.paymentMethod))

}

