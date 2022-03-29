import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateProduct, listProductDetail } from '../actions/productAction'
import axios from 'axios'
import { useParams,useNavigate, useLocation  } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'

const ProductEditScreen = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()


  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const [uploading, setupLoading] = useState(false)

  const productDetail = useSelector(state => state.productDetail)
  const {loading, error, product} = productDetail

  const productUpdate = useSelector(state => state.productUpdate)
  const {loading: loadingUpdate, error:errorUpdate, success: successUpdate} = productUpdate


  useEffect(()=> {
      if(successUpdate){
        dispatch({type: PRODUCT_UPDATE_RESET})
        navigate('/admin/productList')
      }else{
        if(!product.name || product._id !== id){
          dispatch(listProductDetail(id))
        }else{
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
        }
      }
  }, [dispatch,product,id,navigate,successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  }
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    setupLoading(true)
    try {
      const config = {
        headers : {
            'Content-Type': 'multipart/form-data'
        }
      }
      const {data} = await axios.post('/api/upload', formData, config)
      setImage(data)
      setupLoading(false)
    } catch (error) {
      console.log(error)
      setupLoading(false)

    }
  }

  return (
    <>
      < Link to='/admin/productList' className='btn btn-light my-3'>Go Back</Link>

      <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (

      <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder='Enter name' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
          </Form.Group>


          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder='Enter price' value={price} onChange={(e)=> setPrice(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" placeholder='Enter image url' value={image} onChange={(e)=> setImage(e.target.value)}></Form.Control>
            {/* <Card.File id="image-file" label='Choose File' custom onChange={uploadFileHandler}></Card.File> */}
            <Form.Control type="file" id="image-file" label='Choose File'  custom size="sm" onChange={uploadFileHandler}/>
            {uploading && <Loader />}
            
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" placeholder='Enter brand' value={brand} onChange={(e)=> setBrand(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type="number" placeholder='Enter countInStock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder='Enter category' value={category} onChange={(e)=> setCategory(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder='Enter description' value={description} onChange={(e)=> setDescription(e.target.value)}></Form.Control>
          </Form.Group>


          <Button type='submit' variant='primary'>Update</Button>
      </Form>
      )}
      
    </FormContainer>
    </>
    
  )
}

export default ProductEditScreen