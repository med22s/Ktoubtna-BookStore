import React,{useEffect} from 'react' 
import Book from '../components/Book'
import {useDispatch,useSelector} from 'react-redux'
import {listBooks} from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Row,Col} from 'react-bootstrap'
import Paginate from '../components/Paginate'
import BooksCarousel from '../components/BooksCarousel'
const Home = ({match}) => {
    const dispatch=useDispatch()

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    useEffect(()=>{
        dispatch(listBooks(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])

    const {books,error,loading,pages,page}=useSelector(state=>state.bookList)

    return (
        
        <>
        {!keyword && <BooksCarousel />}
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
