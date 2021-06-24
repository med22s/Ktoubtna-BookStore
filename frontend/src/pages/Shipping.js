import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormWrapper from '../components/FormWrapper'
import { saveShippingDetails } from '../actions/cartActions'
import NavigationSteps from '../components/NavigationSteps'

const Shipping=({history})=> {

    const dispatch=useDispatch()
    const {shippingDetails}=useSelector(state=>state.cart)


    const [address,setAddress]=useState(shippingDetails.address)
    const [city,setCity]=useState(shippingDetails.city)
    const [country,setCountry]=useState(shippingDetails.country)
    const [postalCode,setPostalCode]=useState(shippingDetails.postalCode)




    const onSubmit=(e)=>{

        e.preventDefault()
        dispatch(saveShippingDetails({address,city,country,postalCode}))
        history.push('/payment')
    }


    return (
        <FormWrapper>
            <NavigationSteps step1 step2 />
            <h1>Shipping Details</h1>
            <Form onSubmit={onSubmit}>


                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' 
                    placeholder='Enter Address' 
                    value={address} 
                    required 
                    onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text'
                    placeholder='Enter City'
                    value={city} 
                    required 
                    onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>
                Continue
                </Button>

            </Form>

        </FormWrapper>
    )
}

export default Shipping
