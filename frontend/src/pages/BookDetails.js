import React from 'react'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup} from 'react-bootstrap'
import books from '../SampleBooks'
import Rating from '../components/Rating'

const BookDetails = ({match}) => {

    const book=books.find(book=>book._id===match.params.id);

    return (
        <div>
            <Link to='/'>
                <button className='btn-icon'>
                {/* <i className="fas fa-chevron-circle-left fa-3x"></i> */}
                Back to home
                </button>
            </Link>
            <Row>
                <Col className='image-parent' md={4}>
                    <Image className='details-image' src={book.image} alt={book.name} fluid />
                </Col>
                <Col md={5}>
                    <ListGroup className='list' variant='flush' style={{height:'100%'}}>
                        <ListGroup.Item>
                            <h1>{book.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>{book.Author}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={book.rating} text={`${book.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>{'$'+book.price}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Synopsis:</h3>
                            <p>{book.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </div>
    )
}

export default BookDetails
