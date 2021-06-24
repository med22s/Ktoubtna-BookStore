import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormWrapper from '../components/FormWrapper'
import {getResetPasswordToken,passwordReset} from '../actions/userActions'

const PasswordReset = ({history,match}) => {


    const token=match.params.token

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const {user,error,loading}=useSelector(state=>state.getResetPasswordToken)
    const {user:userLogged}=useSelector(state=>state.userLogin)
    const {msg,error:passwordResetError,loading:passwordResetLoading}=useSelector(state=>state.passwordReset)

    const dispatch=useDispatch()


    useEffect(()=>{

        if(!token || error){
            history.push('/login')
        }else{
            if(userLogged){
                history.push('/')
            }else{
                if(!user || !user.userId){
                    dispatch(getResetPasswordToken(token))
                }
            }
        }

        

    },[userLogged,token,user,error])


    useEffect(()=>{

        if(msg){
            setTimeout(() => {
                history.push('/login')
            }, 4000);
        }else if(passwordResetError){
            setMessage(passwordResetError)
            setTimeout(() => {
                history.push('/Reset')
            }, 3000);
        }

        

    },[msg,passwordResetError])


    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
  
          setMessage('Passwords do not match')
          setTimeout(() => {
            setMessage('')
          }, 2000);
  
          
        } else {
          dispatch(passwordReset({resetToken:token,newPassword:password}))
        }



      }






    return (
        <FormWrapper>
          <h1>Password Reset</h1>
          {loading && <Loader />}
          {passwordResetLoading && <Loader />}
          {message && <Message variant='danger'>{message}</Message>}
          {msg && <Message variant='success'>{msg}</Message>}
          <Form onSubmit={onSubmit}>
            
    
            
    
            <Form.Group controlId='password' className='py-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='confirmPassword' className='py-2'>
              <Form.Label>Confirm your Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Button type='submit' variant='primary' className='my-2'>
              Reset Password
            </Button>
          </Form>
    
          <Row className='py-3'>
            <Col>
              Back to{' '}
              <Link to={'/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </FormWrapper>
      )
}

export default PasswordReset
