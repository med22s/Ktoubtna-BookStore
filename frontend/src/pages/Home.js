import React,{useEffect} from 'react' 
import Book from '../components/Book'
import {useDispatch,useSelector} from 'react-redux'
import {listBooks} from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row,Col} from 'react-bootstrap'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import BooksCarousel from '../components/BooksCarousel'
import {Link} from 'react-router-dom'
const Home = ({match}) => {
    const dispatch=useDispatch()

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    useEffect(()=>{
        dispatch(listBooks(keyword,pageNumber))
        //dispatch({type:BOOK_DETAILS_RESET})
    },[dispatch,keyword,pageNumber])

    const {books,error,loading,pages,page}=useSelector(state=>state.bookList)

    return (
        
        <>
        <Meta/>
                {!keyword ? (
                <BooksCarousel />
            ) : (
                <Link to='/'>
                <button className='btn btn-dark my-3'>
                Back to home
                </button>
            </Link>
            )}
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
                <div className='pagination'>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </div>
            </>
        </>
    )
}

export default Home
