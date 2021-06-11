import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile,updateUserProfile } from '../actions/userActions'

const Profile = ({history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()
  
    const  {loading, error, userInfo } = useSelector((state) => state.userProfile)
    const  {updated } = useSelector((state) => state.userUpdateProfile)
    const  {user } = useSelector((state) => state.userLogin)
  
    
    useEffect(() => {
      if (!user) {
        history.push('/login')
      }else{
          if(!userInfo){
            dispatch(getUserProfile('profile'))
          }else{
            setName(userInfo.name)
            setEmail(userInfo.email)
              
          }
      }
    }, [dispatch,history,userInfo,user])
  
    const onSubmit = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        dispatch(updateUserProfile({name,email,password}))
      }
    }


    return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {updated && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='name' className='py-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='py-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='py-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='py-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={8}>
            <h2>Orders</h2>
      </Col>
    </Row>
    )
}

export default Profile
