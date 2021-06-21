import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUsersList,deleteUser } from '../actions/userActions'

const UserList = ({history}) => {


    const dispatch = useDispatch()

    const { loading, error, users } = useSelector((state) => state.userList)
    const {user} = useSelector((state) => state.userLogin)


    const { success } = useSelector((state) => state.userDelete)
  
    useEffect(() => {
        // send the request here to get all users
        if(user && user.isAdmin){
            dispatch(getUsersList())
        }else{
            history.push('/login')
        }
      
    }, [dispatch,user,history,success])
  
    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user ?')) {
            dispatch(deleteUser(id))
        }
    }











    return (
        <>
          <h1>Users List</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </td>
                    <td>
                      {item.isAdmin ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td className='users-details'>
                      <LinkContainer to={`/admin/user/${item._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => onDelete(item._id)}
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

export default UserList
