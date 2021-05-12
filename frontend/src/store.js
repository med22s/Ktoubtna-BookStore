import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const allReducers=combineReducers({});
const inttialState={}
const middleware=[thunk]

const store=createStore(allReducers,inttialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store