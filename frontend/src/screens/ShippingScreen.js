import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userAction'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'

const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [ address, setAddress] = useState(shippingAddress.address)
    const [ city, setCity] = useState(shippingAddress.city)
    const [ postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [ country, setCountry] = useState(shippingAddress.country)
  
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({address,city,postalCode,country}))
      navigate('/payment')
    }
  
  
    return (
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control required type="text" placeholder='Enter address' value={address} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
            </Form.Group>
  
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control required type="text" placeholder='Enter city' value={city} onChange={(e)=> setCity(e.target.value)}></Form.Control>
            </Form.Group>
  
            <Form.Group controlId='postalCode'>
              <Form.Label>PostalCode</Form.Label>
              <Form.Control required type="text" placeholder='Enter postalCode' value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
  
            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control required type="text" placeholder='Enter country' value={country} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
            </Form.Group>
  
  
            <Button type='submit' varian='primary'>Continue</Button>
        </Form>
  
      </FormContainer>
    )
}


export default ShippingScreen