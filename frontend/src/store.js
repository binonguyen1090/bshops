import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailReducer, productListReducer} from './reducers/productReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
})
const initialState = {}
const midleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))


export default store