import React,{useState,useEffect} from 'react' 
import Book from '../components/Book'
import axios from 'axios'
const Home = () => {
    const [books,setBooks]=useState([]);

    useEffect(()=>{
        const getBooks=async ()=>{
            const {data}=await axios.get('/api/books');
            setBooks(data);
        }

        getBooks();
    },[])
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
