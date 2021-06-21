import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Book = ({book}) => {
    return (
        <Card className='my-3 p-3 rounded'>
      <Link to={`/book/${book._id}`}>
        <Card.Img src={book.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as='div'>
            <strong>{book.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
        <Rating rating={book.rating} text={`${book.numReviews} reviews`}/>
          
        </Card.Text>

        <Card.Text as='h3'>${book.price}</Card.Text>
      </Card.Body>
    </Card>
    )
}

export default Book
