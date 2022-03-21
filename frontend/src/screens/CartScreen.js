import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { addToCart } from '../actions/cartAction'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';


const CartScreen = () => {
  const {id} = useParams()
  const productId = id
  const location = useLocation()
  const qty = location.search ?  Number(location.search.split('=')[1]) : 1
  const navigate  = useNavigate()
  const dispatch = useDispatch()
  
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart


  useEffect(() =>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId, qty])
  return (
    <>
        <h1>CartScreen</h1>
        
        
    </>
  )
}

export default CartScreen