import * as actions from './actions';

const ProductsReducer = (store = {

    data: [],
    isLoading: false,
    error: null
    
}, action) => {
    switch(action.type) {
      case actions.FETCH_PRODUCTS_SUCCESS:
        return {
          ...store,
          data: action.products,
          isLoading: false,
          error: null
        }
      case actions.FETCH_PRODUCTS_ERROR: 
        return {
          ...store,
          isLoading: false,
          error: action.error
        }
      case actions.REMOVE_PRODUCT_SUCCESS:
      case actions.ADD_PRODUCT_SUCCESS:
        return {
          ...store,
          data: action.products,
          error: null
        }
      case actions.REMOVE_PRODUCT_ERROR:
      case actions.ADD_PRODUCT_ERROR:
        return {
          ...store,
          error: action.error
        }
      default: 
        return store
    }
}

export default ProductsReducer