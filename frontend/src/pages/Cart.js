import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {addCartItem,removeCartItem} from '../actions/cartActions'
import {Link} from 'react-router-dom'
import Message from '../components/Message'



const Cart = ({match,location,history}) => {

    const dispatch=useDispatch()
    const {cartItems}=useSelector(state=>state.cart)

    const book_id=match.params.id
    const quantity=location.search ? Number(location.search.split('=')[1]) : 1


    useEffect(()=>{
        if(book_id){
            dispatch(addCartItem(book_id,quantity))
        }
    },[dispatch,book_id,quantity])


    
    
      const onCheckout = () => {
        history.push('/login?redirect=shipping')
      }



    return (
        <Row>
            <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
        <Col md={8}>
          
          {!cartItems || cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems && cartItems.map((item) => (
                <ListGroup.Item key={item.book}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/book/${item.book}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control className='form-select' 
                        as='select'
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addCartItem(item.book, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.numberInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={()=>dispatch(removeCartItem(item.book))}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems && cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h2>
                Total Price: 
                $
                {cartItems && cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={ cartItems && cartItems.length === 0}
                  onClick={onCheckout}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
}

export default Cart
