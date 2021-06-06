import {ADD_CART_ITEM,REMOVE_CART_ITEM,CART_ERROR} from '../Types/cartTypes'
import axios from 'axios'


export const addCartItem=(id,quantity)=>async(dispatch,getState)=>{

    
    try {
        const {data}=await axios.get(`/api/books/${id}`)
        dispatch({
            type:ADD_CART_ITEM,
            payload:{
                book:data._id,
                name:data.name,
                image:data.image,
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

