import React from 'react'
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
import {useSelector,useDispatch} from 'react-redux'


const NavBar = () => {


    const {user}=useSelector(state=>state.userLogin)
    const dispatch=useDispatch()


    const onLogout=()=>{
        dispatch(logout())
    }


    return (
        <div>
            <Navbar  className='navbar navbar-expand-lg navbar-dark bg-primary' expand="lg" collapseOnSelect>
                <Container >
                        <LinkContainer to='/'>
                            <Navbar.Brand ><span className='logo color-me' >KTOUBTNA BOOKSTORE</span></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><span className='color-me icons'> <i className='fas fa-shopping-cart'></i> CART</span></Nav.Link>
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
                                    <i className='fas fa-user'></i> SIGN IN
                                </Nav.Link>
                                </LinkContainer>
                            )}
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
