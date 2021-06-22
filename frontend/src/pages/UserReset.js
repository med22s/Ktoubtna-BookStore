import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormWrapper from '../components/FormWrapper'
import { forgetPassword } from '../actions/userActions'

const UserReset = ({history}) => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const {user,loading,error} = useSelector((state) => state.userLogin)
    const {loading:forgetPasswordLoading,error:forgetPasswordError,success,msg} = useSelector((state) => state.forgetPassword)




    useEffect(() => {
        if (user) {
          history.push('/')
        }
      }, [history, user])
    
      const onSubmit = (e) => {
        e.preventDefault()
        if(!email){
            alert('email is required !!')
        }else{
            dispatch(forgetPassword({email}))
        }
        
      }


    return (
    <FormWrapper>
        <h1>Account Reset</h1>
        {error && <Message variant='danger'>{error}</Message>
        }
        {forgetPasswordError && <Message variant='danger'>{forgetPasswordError}</Message>
        }
        {loading && <Loader />}
        {forgetPasswordLoading && <Loader />}
        {success && <Message variant='success'>{msg}</Message>}
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

            <Button type='submit' variant='primary'>
            Reset Email
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Back to {' '}
            <Link to={'/login'}>
                Login
            </Link>
            </Col>
        </Row>
    </FormWrapper>
    )
}

export default UserReset
