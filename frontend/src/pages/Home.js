import React,{useEffect} from 'react' 
import Book from '../components/Book'
import {useDispatch,useSelector} from 'react-redux'
import {listBooks} from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row,Col} from 'react-bootstrap'
const Home = () => {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(listBooks())
    },[dispatch])

    const {books,error,loading}=useSelector(state=>state.bookList)

    return (
        
        <>
            <h1>Top Rated Books</h1>
            <>

                {
                    loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    :<>
                        <Row>
                                    {books.map((book) => (
                        <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                            <Book book={book} />
                        </Col>
                        ))}
                        </Row>
                    </>
                }
            </>
        </>
    )
}

export default Home
