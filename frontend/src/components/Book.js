import React from 'react'
import Rating from './Rating'
import {Link} from 'react-router-dom'

const Book = ({book}) => {
    return (
        <>
            
            <div className='book'>
                <img className='img' alt='Novel' src={book.image} ></img>
                <div class="image-album-overlay image-album-overlay-blur">
                    <h2 class="title">{book.name}</h2>
                    <h4 class="author">{book.Author}</h4>
                    <p class="description">
                        {book.description}
                    </p>
                    <div className="rating my-3">
                        <Rating rating={book.rating} text={`${book.numReviews} reviews`}/>
                    </div>
                        <Link to={`/book/${book._id}`} className='btn'>Read More</Link>
                </div>
            </div>
        </>
    )
}

export default Book
