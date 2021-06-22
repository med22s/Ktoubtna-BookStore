import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails.js'
import Cart from './pages/Cart.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Profile from './pages/Profile.js'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import SubmitOrder from './pages/SubmitOrder'
import OrderDetails from './pages/OrderDetails'
import UserList from './pages/UserList'
import UserEdit from './pages/UserEdit'
import BookList from './pages/BookList'
import BookEdit from './pages/BookEdit'
import OrderList from './pages/OrderList'
import Chat from './pages/Chat'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {USER_LOGIN_SUCCESS} from './Types/userTypes'
import {logout} from './actions/userActions'
import UserReset from './pages/UserReset'
import PasswordReset from './pages/PasswordReset'


function App() {


const dispatch=useDispatch()

// const LogoutUser = () => {
//   localStorage.removeItem('user');
//   localStorage.removeItem('token');
//   dispatch({type : USER_LOGOUT});
// }

// Whether the mark is being refreshed	
let isRefreshing = false	

	
 // Retry queue, each item will be a form of function to be executed	
let retryRequests = []	
 
	
	
 // http response interceptor Response	
axios.interceptors.response.use(	
	(response) => {
    console.log(response);
		return response
	},	
	(error) => {	

    if (error.response && error.response.status === 401) {
      dispatch(logout());	
      return Promise.reject(error);
		}
		else if (error.response && error.response.status === 403) {	
			const config = error.config	
			if (!isRefreshing) {	
				isRefreshing = true	
				return refreshToken()	
					.then((res) => {	
            const { token} = res.data;
            //localStorage.setItem('token',token);
            localStorage.setItem('user',JSON.stringify(res.data));
						// reset token	
            config.headers['Authorization'] = 'Bearer ' + token;						 
             // The token has been refreshed, retry all the requests in the queue	
						retryRequests.forEach((cb) => cb(token))	
						 // Empty the queue after retrying	
						retryRequests = [];
            dispatch({type : USER_LOGIN_SUCCESS,payload : res.data});
            config.baseURL = ''	;
						return axios(config)	
					})	
					.catch((err) => {	
            return Promise.reject(err);            
					})	
					.finally(() => {	
						isRefreshing = false	
					})	
			} else {	
				 // Refreshing the token, returning a promise that has not been resolved	
				return new Promise((resolve) => {	
					 // Put resolve into the queue, save it in a function form, and execute directly after the token is refreshed	
					retryRequests.push(token => {	
            config.baseURL = ''	;
						config.headers['Authorization'] = 'bearer '+token	;
						resolve(axios(config))	
					})	
				})	
			}	
		} else {	
			return Promise.reject(error)	
		}	
	}	
)
const refreshToken = () => {
  return new Promise((resolve, reject) => {
    const config={
      headers:{
          'Content-Type':'application/json'
      }
    }
    axios
      .get(`/api/auth/token`,config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}




return (
    <Router>
    <Header/>
    <main className='py-3'>
      
        <Container>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/book/:id' exact component={BookDetails}></Route>
            <Route path='/cart/:id?' exact component={Cart}></Route>
            <Route path='/Login' exact component={Login}></Route>
            <Route path='/register' exact component={Register}></Route>
            <Route path='/profile' exact component={Profile}></Route>
            <Route path='/shipping' exact component={Shipping}></Route>
            <Route path='/payment' exact component={Payment}></Route>
            <Route path='/placeorder' exact component={SubmitOrder}></Route>
            <Route path='/order/:id' exact component={OrderDetails}></Route>
            <Route path='/admin/userlist' exact component={UserList}></Route>
            <Route path='/admin/booklist' exact component={BookList}></Route>
            <Route path='/admin/orderlist' exact component={OrderList}></Route>
            <Route path='/admin/user/:id/edit' exact component={UserEdit}></Route>
            <Route path='/admin/book/:id/edit' exact component={BookEdit}></Route>
            <Route path='/Reset' exact component={UserReset}></Route>
            <Route path='/resetPassword/:token' exact component={PasswordReset}></Route>
            <Route path='/search/:keyword' exact component={Home} />
            <Route path='/chat' exact component={Chat} />
            <Route
              path='/admin/bookList/:pageNumber'
              component={BookList}
              exact
            />
            <Route
              path='/admin/orderlist/:pageNumber'
              component={OrderList}
              exact
            />
            <Route path='/page/:pageNumber' component={Home} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={Home}
              exact
            />
          </Switch>
        </Container>
    </main>
    <Footer/>
  </Router>
);
}

export default App;
