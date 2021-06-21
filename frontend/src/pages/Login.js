import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormWrapper from '../components/FormWrapper'
import { loginUser } from '../actions/userActions'

const Login = ({history,location}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const {user,loading,error} = useSelector((state) => state.userLogin)

    console.log('loading login',loading)
    console.log('error login',error)


    const redirect=location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (user) {
          history.push(redirect)
        }
      }, [history, user, redirect])
    
      const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
      }


    return (
    <FormWrapper>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>
        }
        {loading && <Loader />}
        <Form onSubmit={onSubmit}>
            <Form.Group controlId='email' className='py-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='py-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
            Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
            </Link>
            </Col>
        </Row>
    </FormWrapper>
    )
}

export default Login
