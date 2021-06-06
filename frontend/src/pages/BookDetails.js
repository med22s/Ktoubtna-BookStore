import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Form,Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch,useSelector} from 'react-redux'
import {bookDetails} from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const BookDetails = ({match,history}) => {

    const dispatch=useDispatch()
    const [qty,setQty]=useState(1)


    useEffect(()=>{
       dispatch(bookDetails(match.params.id))
    },[dispatch,match]) // eslint-disable-line react-hooks/exhaustive-deps



    const addToCart=e=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const {book,loading,error}=useSelector(state=>state.bookDetails)

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
            
                

        </div>
            )
        }

    </>
        
    )
}

export default BookDetails
