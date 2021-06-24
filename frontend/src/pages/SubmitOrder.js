import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import NavigationSteps from '../components/NavigationSteps'
import { saveOrder } from '../actions/orderActions'
import { ORDER_SAVE_RESET } from '../Types/orderTypes'






const SubmitOrder = ({history}) => {

    const dispatch=useDispatch()

    
    const cart=useSelector(state=>state.cart)
    const {cartItems,shippingDetails,paymentMethod}=cart

    const {address,city,postalCode,country}=shippingDetails

    // check is shippingDetails or paymentMode are available

    if (!shippingDetails) {
        history.push('/shipping')
      } else if (!paymentMethod) {
        history.push('/payment')
      }

      const orderSave = useSelector((state) => state.orderSave)
      const { order, saved, error } = orderSave


      // check if the placing order process went successfully
    
      useEffect(() => {

        if (saved) {
          dispatch({type:ORDER_SAVE_RESET})
          history.push(`/order/${order._id}`)
          
        } else {
          console.log('outside',saved)
          history.push(`/placeorder`)
          
        } 
        // eslint-disable-next-line
      }, [history, saved])
    




      const configureDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
    
      cart.itemsPrice = configureDecimals(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      )
      cart.shippingPrice = configureDecimals(cart.itemsPrice > 90 ? 0 : 100)
      cart.taxPrice = configureDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
      cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
      ).toFixed(2)




    const onPlaceOrder=(e)=>{
        // dispatch the action
        dispatch(saveOrder({orderBooks:cartItems,shippingDetails,
            paymentMethod,itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice}))
    }



    return (
    <>
      <NavigationSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>{' '}
                {address}, {city}{' '}
                {postalCode},{' '}
                {country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              <span className='text-success'>{paymentMethod}</span> 
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.book}>
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (<ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>)}



              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems === 0}
                  onClick={onPlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
    )
}

export default SubmitOrder
