import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { getTopBooks } from '../actions/bookActions'

const BooksCarousel = () => {
  const dispatch = useDispatch()

  const bookTopRated = useSelector((state) => state.bookTopRated)
  const { loading, error, books } = bookTopRated

  useEffect(() => {
    dispatch(getTopBooks())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      { books.map((book) => (
        <Carousel.Item key={book._id}>
          <Link to={`/book/${book._id}`}>
            <Image src={book.image} alt={book.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {book.name} (${book.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default BooksCarousel