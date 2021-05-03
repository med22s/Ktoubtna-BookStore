import React from 'react'
import {Navbar,Nav,Container,Form,FormControl,Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const NavBar = () => {
    return (
        <div>
            <Navbar className="navbar active" style={{backgroundColor:'rgb(99, 73, 135)', background:'transparent'}} variant='light'  expand="lg" collapseOnSelect>
                <Container >
                        <LinkContainer to='/'>
                            <Navbar.Brand ><span className='logo color-me' >Ktoubtna</span></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><span className='color-me icons'> <i className='fas fa-shopping-cart'></i> Cart</span></Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><span className='color-me icons'> <i className='fas fa-user'></i> Sign In</span></Nav.Link>
                            </LinkContainer>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="search__" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar
