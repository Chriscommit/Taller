import * as actions from './actions';

const BasketReducer = (state = {

    data: [],
    isLoading: false,
    error: null
    
}, action) => {
    switch(action.type) {
      case actions.FETCH_BASKET_SUCCESS:
        return {
          ...state,
          data: action.basket,
          isLoading: false,
          error: null
        }
      case actions.FETCH_BASKET_ERROR: 
        return {
          ...state,
          isLoading: false,
          error: action.error
        }
      case actions.REMOVE_PRODUCT_TO_BASKET_SUCCESS:
        return {
          ...state,
          data: action.basket,
          error: null
        }
      case actions.ADD_PRODUCT_TO_BASKET_SUCCESS:
        return {
          ...state,
          data: action.basket,
          error: null
        }
      case actions.REMOVE_PRODUCT_TO_BASKET_ERROR:
      case actions.ADD_PRODUCT_TO_BASKET_ERROR:
        return {
          ...state,
          error: action.error
        }
      default: 
        return state
    }
}

export default BasketReducer