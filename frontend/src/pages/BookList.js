import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBooks,deleteBook,addBook } from '../actions/bookActions'
import { BOOK_CREATE_RESET } from '../Types/bookTypes'

const BookList = ({history}) => {



    const dispatch = useDispatch()

  const { loading, error, books } = useSelector((state) => state.bookList)

  const {user} = useSelector((state) => state.userLogin)

  const {success,error:deleteError,loading:deleteLoading} = useSelector((state) => state.bookDelete)

  const {success:successCreate,error:errorCreate,loading:loadingCreate,book:createdbook} = useSelector((state) => state.bookCreate)

  useEffect(() => {
      dispatch({type:BOOK_CREATE_RESET})
      if (!user || !user.isAdmin) {
        history.push('/login')
      }
  
      if (successCreate) {
        history.push(`/admin/book/${createdbook._id}/edit`)
      } else {
        dispatch(listBooks())
      }
  }, [dispatch, history, user,success,successCreate,createdbook])

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book !')) {
      dispatch(deleteBook(id))
    }
  }

  const onCreate = () => {
    dispatch(addBook())
  }






  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Books</h1>
        </Col>
        <Col className='align-item'>
          <Button className='my-3' onClick={onCreate}>
            <i className='fas fa-plus'></i> add new Book
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader/>}
      {deleteError && <Message variant='danger'>{deleteError}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>AUTHOR</th>
              <th>GENRE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.name}</td>
                <td>${book.price}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <LinkContainer to={`/admin/book/${book._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => onDelete(book._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BookList
