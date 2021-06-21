import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormWrapper from '../components/FormWrapper'
import { bookDetails,updateBook } from '../actions/bookActions'
import { BOOK_DETAILS_RESET, BOOK_UPDATE_RESET } from '../Types/bookTypes'

const BookEdit = ({match,history}) => {

    const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [imageFile, setImageFile] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [numberInStock, setNumberInStock] = useState(0)
  const [description, setDescription] = useState('')
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(file.name);
  }


  const bookId=match.params.id

  const dispatch = useDispatch()

  const { loading, error, book } = useSelector((state) => state.bookDetails)

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.bookUpdate)

  useEffect(() => {
      
      if(successUpdate){
        dispatch({type:BOOK_DETAILS_RESET})
        dispatch({type:BOOK_UPDATE_RESET})
        history.push('/admin/booklist')
      }else{
        if (!book || !book.name || book._id !== bookId) {
            dispatch(bookDetails(bookId))
          } else {
            setName(book.name)
            setPrice(book.price)
            setImage(book.image)
            setAuthor(book.author)
            setGenre(book.genre)
            setNumberInStock(book.numberInStock)
            setDescription(book.description)
          }
      }
    
  }, [dispatch, history, bookId, book,successUpdate])

  const onSubmit = (e) => {
    e.preventDefault();
    // UPDATE book
    const formData = new FormData()
    if(imageFile !== '')
      formData.append('image',imageFile);
    formData.append('name',name);
    formData.append('price',price)
    formData.append('author',author)
    formData.append('genre',genre)
    formData.append('numberInStock',numberInStock)
    formData.append('description',description);
    dispatch(updateBook(
        bookId,
        formData
    ))
  }



  return (
    <>
      <Link to='/admin/booklist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormWrapper>
        <h1>Edit Book</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && errorUpdate.length > 0 &&  errorUpdate.map(error => {
          return <Message variant='danger'>{error.msg}</Message>
        })} 
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.File
                id='image-file'
                label='Choose File'
                custom 
                onChange={uploadFile}
              ></Form.File>

            <Form.Group controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter author's name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numberInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={numberInStock}
                onChange={(e) => setNumberInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='genre'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter genre'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export default BookEdit
