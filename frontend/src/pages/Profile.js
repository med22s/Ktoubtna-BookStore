import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col,Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile,updateUserProfile } from '../actions/userActions'
import { getListPersonalOrders } from '../actions/orderActions'
import {USER_UPDATE_PROFILE_RESET } from '../Types/userTypes'

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


    // orders state

    const orderListPersonal = useSelector((state) => state.orderListPersonal)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListPersonal
  
    
    useEffect(() => {
      if (!user) {
        history.push('/login')
      }else{
          if(!userInfo || !userInfo.name || updated){

            setTimeout(() => {
              dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(getUserProfile('profile'))
            dispatch(getListPersonalOrders())
            }, 1000);

            
            
          }else{
            setName(userInfo.name)
            setEmail(userInfo.email)
          }
      }
    }, [dispatch,history,userInfo,user,updated])
  
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
            <h2>ORDERS</h2>
            {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm btn-block btn-details' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
    )
}

export default Profile
