import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormWrapper from '../components/FormWrapper'
import { getUserProfile ,updateUser} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../Types/userTypes'

const UserEdit = ({match,history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()


    const  {loading, error, userInfo } = useSelector((state) => state.userProfile)

    const  {loading:loadingUpdate, error:errorUpdate, success } = useSelector((state) => state.userUpdate)


    const userId=match.params.id


    useEffect(() => {

        if(success){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if (!userInfo.name || userInfo._id !== userId) {
                dispatch(getUserProfile(userId))
              } else {
                setName(userInfo.name)
                setEmail(userInfo.email)
                setIsAdmin(userInfo.isAdmin)
              }
        }

        
      }, [dispatch, userId, userInfo,success,history])


      const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
      }

    
return (
    <>
      <Link to='/admin/userlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormWrapper>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='my-2'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormWrapper>
    </>
  )
}

export default UserEdit
