import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Form,Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch,useSelector} from 'react-redux'
import {bookDetails} from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {addBookReview} from '../actions/bookActions'
import { BOOK_ADD_REVIEW_RESET } from '../Types/bookTypes'

const BookDetails = ({match,history}) => {

    const dispatch=useDispatch()
    const [qty,setQty]=useState(1)
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')

    const { user } = useSelector((state) => state.userLogin)

  const {
    success: successBookReview,
    error: errorBookReview,
  } = useSelector((state) => state.bookAddReview)


    useEffect(()=>{
        if(successBookReview){
            alert('Review Added !')
            dispatch({type:BOOK_ADD_REVIEW_RESET})
            setMessage('')
            setRating(0)
        }
       dispatch(bookDetails(match.params.id))
    },[dispatch,match,successBookReview]) // eslint-disable-line react-hooks/exhaustive-deps



    const addToCart=e=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const {book,loading,error}=useSelector(state=>state.bookDetails)


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(
          addBookReview(match.params.id, {
            rating,
            message,
          })
        )
      }

    return (
        <>
        {
            loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                <div>
            <Link to='/'>
                <button className='btn btn-dark my-3'>
                {/* <i className="fas fa-chevron-circle-left fa-3x"></i> */}
                Back to home
                </button>
            </Link>
            <Row>
                <Col className='image-parent' md={3}>
                    <Image className='details-image' src={book.image} alt={book.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup className='list' variant='flush' style={{height:'100%'}}>
                        <ListGroup.Item>
                            <h1>{book.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>{book.author}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={book.rating} text={`${book.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>{book.genre}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Synopsis:</h3>
                            <p>{book.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${book.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                            <Col>Status:</Col>
                            <Col>
                                <h5 className={book.numberInStock >=1 ? 'green':'red'}>
                                    {book.numberInStock >=1 ? 'In Stock':'Out Of Stock'}
                                </h5>
                            </Col>
                            </Row>
                        </ListGroup.Item>

                    {book.numberInStock > 0 && (
                        <ListGroup.Item variant='flush'>
                            <Row>
                                <Col>Quantity:</Col>
                                <Col>
                                
                                    <Form.Control className='form-select' as="select"  
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                    >
                                        {[...Array(book.numberInStock).keys()].map(
                                        (x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        )
                                        )}
                                    </Form.Control> 
                               
                                
                                </Col>
                            </Row>
                        </ListGroup.Item>
                  )}

                    <ListGroup.Item>

                        <Button
                        onClick={addToCart}
                        style={{width:'100%'}}
                        className='btn-cart'
                        type='button'
                        disabled={book.numberInStock === 0}
                        >
                        Add To Cart
                        </Button>
                    </ListGroup.Item>

                   
                    </ListGroup>
                </Col>
            </Row>


            <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {book.reviews && book.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {book.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.message}</p>
                  </ListGroup.Item>
                  
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorBookReview && (
                    <Message variant='danger'>{errorBookReview}</Message>
                  )}
                  {user ? (
                    <Form onSubmit={onSubmit}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control className='form-select' 
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='message'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' className='my-3'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message >
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
            
                

        </div>
            )
        }

    </>
        
    )
}

export default BookDetails
