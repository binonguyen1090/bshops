import React from 'react'
import {PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_FAIL,  PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL} from '../constants/productConstant'
export const productListReducer = (state={products: []}, action) => {
  switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false,products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
  }
}

export const productDetailReducer = (state={product: {reviews: []}}, action) => {
  switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading: false,product: action.payload.product}
        case PRODUCT_DETAIL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
  }
}

