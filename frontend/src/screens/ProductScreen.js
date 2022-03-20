import React , {useState, useEffect}from 'react'
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from '../products';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetail } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
const ProductScreen = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail)
  const {loading, error, product} = productDetail

  useEffect(() =>{
    dispatch(listProductDetail(id))
  },[dispatch])
  return (
    <>
      <Link className='btn btn-dark my-3' to="/" >Go Back</Link>
      {loading ? <Loader />: error ? <Message variant='danger'>{error}</Message> :  

      <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} flush />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item >
                  <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item >
                  <Rating value={product.rating}
                        text={`${product.numReviews}  reviews`} 
                  />
              </ListGroup.Item>
              <ListGroup.Item >
                  Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item >
                  Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                      <Col>
                        Price
                      </Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                      <Col>
                        Status
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='btn btn-block' type='button' disable={product.countInStock === 0}>
                        Add To Cart
                    </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
      </Row>
      }
    </>
  )
}

export default ProductScreen