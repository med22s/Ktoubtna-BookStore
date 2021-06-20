import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  


  return (
    <Form onSubmit={onSubmit} inline className='form'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Books...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='  btn-search'>
        Search
      </Button>
    </Form>





  )
}

export default Search