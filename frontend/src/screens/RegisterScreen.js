import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { resgister } from '../actions/userAction'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userAction'


const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const {loading, error, userInfo} = userRegister

  useEffect(()=> {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      setMessage('Password do not match')
    }else{
      dispatch(resgister(name, email, password))
    }
  }
  const demoLogin = (e) => {
    e.preventDefault()
    navigate('/')
    dispatch(login('demo@example.com', '123456'))
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder='Enter name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
          </Form.Group>


          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control type="password" placeholder='Confirm password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>Register</Button>
          <Button  onClick={demoLogin} variant='warning'>Demo</Button>
      </Form>
      <Row className='py-3'>
         <Col>
            Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
         </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen