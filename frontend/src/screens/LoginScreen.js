import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userAction'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect(()=> {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const demoLogin = (e) => {
    e.preventDefault()
    dispatch(login('demo@example.com', '123456'))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>Sign In</Button>
          <Button  onClick={demoLogin} variant='warning'>Demo</Button>
      </Form>
      <Row className='py-3'>
         <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
         </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen