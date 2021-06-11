import React,{useState,useEffect} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormWrapper from '../components/FormWrapper'
import NavigationSteps from '../components/NavigationSteps'
import { savePaymentMethod } from '../actions/cartActions'

const Payement = ({history}) => {


    const {shippingDetails}=useSelector(state=>state.cart)
    const dispatch=useDispatch()

    const [paymentMethod,setPaymentMethod]=useState('PayPal')
    const onSubmit=(e)=>{
        e.preventDefault()
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        // move to place order screen

        history.push('/placeorder')
    }


    useEffect(()=>{
        if(!shippingDetails) history.push('/shipping')
    },[shippingDetails,history])


    return (
        <FormWrapper>
            <NavigationSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                Continue
                </Button>
            </Form>
        </FormWrapper>
    )
}

export default Payement
