import React,{useEffect} from 'react'
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
import {useSelector,useDispatch} from 'react-redux'
import { Route } from 'react-router-dom'
import Search from './Search'


const NavBar = () => {

  const {user}=useSelector(state=>state.userLogin)
    const dispatch=useDispatch()

  useEffect(()=>{
    console.log(user)
  },[user])


    


    const onLogout=()=>{
        dispatch(logout())
    }


    return (
        <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            
          <LinkContainer to='/'>
            <Navbar.Brand>KTOUBTNA BOOKSTORE</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            
            <Nav className='mr-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && user.isAdmin === 1  && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/booklist'>
                    <NavDropdown.Item>Books</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
            
            
          </Navbar.Collapse>
          <Route render={({ history }) => <Search history={history} />} />
        </Container>
      </Navbar>
    )
}

export default NavBar
