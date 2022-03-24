import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userAction'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        navigate('/shipping')
    }


    const [ paymentMethod, setPaymentMethod] = useState('Paypal')

  
    
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    }
  
  
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select  Method
                </Form.Label>
            
                <Col>
                    
                    <Form.Check type='radio' 
                        label='Paypal or Credit Card' 
                        id='Paypal' 
                        name='paymentMethod' 
                        value='Paypal' 
                        checked
                        onChange={(e) =>setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check type='radio' 
                        label='Stripe' 
                        id='Stripe' 
                        name='paymentMethod' 
                        value='Stripe' 
                        onChange={(e) =>setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>
  
            <Button type='submit' varian='primary'>Continue</Button>
        </Form>
  
      </FormContainer>
    )
}


export default PaymentScreen