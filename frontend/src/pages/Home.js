import React from 'react'
import books from '../SampleBooks'
import Book from '../components/Book'
const Home = () => {
    return (
        <>
            <h1>Top Rated Books</h1>
            <div className='grid-wrapper'>
                {books.map(book=>(
                    <Book key={book._id} book={book}/>
                ))}
            </div>
                
        </>
    )
}

export default Home
