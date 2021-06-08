import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {bookListReducer,bookDetailsReducer} from './reducers/bookReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userProfileReducer,userUpdateProfileReducer} from './reducers/userReducers'

const allReducers=combineReducers({
    bookList:bookListReducer,
    bookDetails:bookDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userProfile:userProfileReducer,
    userUpdateProfile:userUpdateProfileReducer
    
});


const cartItems=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null



const inttialState={
    cart:{cartItems},
    userLogin:{user}
}
const middleware=[thunk]

const store=createStore(allReducers,inttialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store