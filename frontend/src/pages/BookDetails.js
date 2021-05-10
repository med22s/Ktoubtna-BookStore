import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const BookDetails = ({match}) => {

    const [book,setBook]=useState({});

    useEffect(()=>{
        const getBook=async ()=>{
            const {data}=await axios.get(`/api/books/${match.params.id}`);
            setBook(data);
        }

        getBook();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Link to='/'>
                <button className='btn-icon'>
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
                    <ListGroup >
                        <Row>
                            <Col>
                                <ListGroup.Item>
                                    <h4>Price: ${book.price}</h4>
                                </ListGroup.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ListGroup.Item>
                                    <h5 className={book.numberInStock >=1 ? 'green':'red'}>{book.numberInStock >=1 ? 'In Stock':'Out Of Stock'}</h5>
                                </ListGroup.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ListGroup.Item>
                                   <button style={{width:'100%'}} className={book.numberInStock >0 ? 'btn' : 'btn-disabled'} disabled={book.numberInStock <=0}>Add to Cart</button>
                                </ListGroup.Item>
                            </Col>
                        </Row>

                   
                    </ListGroup>
                </Col>
            </Row>
            
                

        </div>
    )
}

export default BookDetails
