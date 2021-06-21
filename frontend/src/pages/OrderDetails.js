import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAYMENT_RESET,ORDER_DELIVER_RESET } from '../Types/orderTypes'
import axios from 'axios'
import {
  getOrderDetails,payOrder,deliverOrder
} from '../actions/orderActions'

const OrderDetails = ({match,history}) => {

    const id=match.params.id


    const [sdk,setSdk]=useState(false)

    const dispatch = useDispatch()

    // state stuff

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPayment = useSelector((state) => state.orderPayment)
    const { loading: loadingPayment, success } = orderPayment


    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
    const userLogin = useSelector((state) => state.userLogin)
    const { user } = userLogin

    if (!loading) {
        //   Calculate prices
        const configureDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = configureDecimals(
          order.orderBooks.reduce((acc, item) => acc + item.price * item.quantity, 0)
        )
      }


      // paypal script setup

      const addPaypalScript=async ()=>{
          const {data:clientId}=await axios.get('/api/config/paypal')
          const script=document.createElement('script')
          script.async=true
          script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
          script.type='text/javascript'
          script.onload=()=>{
            setSdk(true)
          }

          // append to the documents root

          document.body.appendChild(script)
      }

    
      useEffect(() => {

        if (!user) {
          history.push('/login')
        }

        if(!order || order._id !== id || success || successDeliver) {
            dispatch({ type: ORDER_PAYMENT_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            // to prevent and endless loop 
            dispatch(getOrderDetails(id))
        }else if (!order.isPaid) {
            if (!window.paypal) {
              addPaypalScript()
            } else {
              setSdk(true)
            }
        }
    }, [order, id,dispatch,success,successDeliver,user,history])



    const onSuccess=(paymentResult)=>{
        dispatch(payOrder(id,paymentResult))
    }


    const onDeliver=()=>{
      // deliver 
      dispatch(deliverOrder(order))
    }



     return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1 className='mt-3 mb-3'>ORDER ID: <span className='text-success'>{order._id}</span></h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingDetails.address}, {order.shippingDetails.city}{' '}
                {order.shippingDetails.postalCode},{' '}
                {order.shippingDetails.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>Method: </strong>
                <span className='text-success'>{order.paymentMethod}</span>
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {order.orderBooks.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderBooks.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/book/${item.book}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>ORDER SUMMARY</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPayment && <Loader />}
                  {!sdk ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={onSuccess}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={onDeliver}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderDetails
