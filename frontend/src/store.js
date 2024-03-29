import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {bookListReducer,bookDetailsReducer,bookDeleteReducer, bookCreateReducer, bookUpdateReducer, bookAddReviewReducer, bookTopRatedReducer} from './reducers/bookReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userProfileReducer,userUpdateProfileReducer, userListReducer,
     userDeleteReducer,userUpdateReducer, forgetPasswordReducer, getResetPasswordTokenReducer, passwordResetReducer, userLogoutReducer} from './reducers/userReducers'
import {orderSaveReducer,orderDetailsReducer,orderPaymentReducer,orderListPersonalReducer, orderListReducer, orderDeliverReducer} from './reducers/orderReducers'

const allReducers=combineReducers({
    bookList:bookListReducer,
    bookDetails:bookDetailsReducer,
    bookCreate:bookCreateReducer,
    bookDelete:bookDeleteReducer,
    bookUpdate:bookUpdateReducer,
    bookAddReview:bookAddReviewReducer,
    bookTopRated:bookTopRatedReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userProfileReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderSave:orderSaveReducer,
    orderDetails:orderDetailsReducer,
    orderPayment:orderPaymentReducer,
    orderListPersonal:orderListPersonalReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    forgetPassword:forgetPasswordReducer,
    getResetPasswordToken:getResetPasswordTokenReducer,
    passwordReset:passwordResetReducer,
    logout : userLogoutReducer
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