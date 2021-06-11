import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {bookListReducer,bookDetailsReducer} from './reducers/bookReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userProfileReducer,userUpdateProfileReducer} from './reducers/userReducers'
import {orderSaveReducer,orderDetailsReducer} from './reducers/orderReducers'

const allReducers=combineReducers({
    bookList:bookListReducer,
    bookDetails:bookDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userProfileReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderSave:orderSaveReducer,
    orderDetails:orderDetailsReducer
});



// cart item from local storage

const cartItems=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []


// user details from local storage

const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

// shipping details from local storage
const shippingDetails=localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : {}

// payment method from local storage
const paymentMethod=localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''



const inttialState={
    cart:{cartItems,shippingDetails,paymentMethod},
    userLogin:{user}
}




const middleware=[thunk]

const store=createStore(allReducers,inttialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store