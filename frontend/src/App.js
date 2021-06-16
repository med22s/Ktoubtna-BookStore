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
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


function App() {
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
              <Route path='/admin/user/:id/edit' exact component={UserEdit}></Route>
              <Route path='/admin/book/:id/edit' exact component={BookEdit}></Route>
            </Switch>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
