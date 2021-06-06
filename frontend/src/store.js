import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {bookListReducer,bookDetailsReducer} from './reducers/bookReducers'
import {cartReducer} from './reducers/cartReducers'

const allReducers=combineReducers({
    bookList:bookListReducer,
    bookDetails:bookDetailsReducer,
    cart:cartReducer
});


const cartItems=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []


const inttialState={
    cart:{cartItems}
}
const middleware=[thunk]

const store=createStore(allReducers,inttialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store