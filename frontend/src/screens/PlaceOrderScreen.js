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
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderAction'

const PlaceOrderScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state =>state.cart)

    // calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty,0)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate  = useSelector(state =>state.orderCreate)
    const {order, success, error} = orderCreate


    useEffect(() => {
        if(success){
            navigate(`/orders/${order._id}`)
        }
    },[success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>

                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {' '}
                            {cart.shippingAddress.city}, {' '}
                            {cart.shippingAddress.postalCode}, {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        <strong>Method: </strong>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>: 
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) =>(
                                    <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`} >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                                
                                            </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        }

                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>   
                        
                        <ListGroup.Item>
                            <Button type='button' 
                            className='btn-block'
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen