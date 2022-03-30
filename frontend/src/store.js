import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productUpdateReducer, productCreateReducer, productDeleteReducer, productDetailReducer, productListReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userUpdateReducer, userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateProfileReducer, userListReducer,userDeleteReducer } from './reducers/userReducers'
import { orderListReducer, orderCreateReducer,orderDetailsReducer,orderPayReducer, orderListMyReducer } from './reducers/orderReducers'
const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart:{cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin:{userInfo: userInfoFromStorage},
}
const midleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))


export default store