import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetail } from '../actions/userAction'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'


const UserEditScreen = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetail = useSelector(state => state.userDetail)
  const {loading, error, user} = userDetail
  

  const redirect = location.search ? location.search.split('=')[1] : '/'



  useEffect(()=> {
    if(!user.name || user._id !== id){
        dispatch(getUserDetail(id))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch,user])

  const submitHandler = (e) => {
    e.preventDefault()
    
  }

  return (
    <>
      < Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>

      <FormContainer>
      <h1>Edit user</h1>

      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (

      <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder='Enter name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
          </Form.Group>


          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin'>
            <Form.Check type="checkbox" label='Is Admin' checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group>


          <Button type='submit' variant='primary'>Update</Button>
      </Form>
      )}
      
    </FormContainer>
    </>
    
  )
}

export default UserEditScreen