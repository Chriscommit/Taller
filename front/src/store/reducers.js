import { combineReducers } from "redux"
import BasketReducer from './basket/reducer'
import ProductsReducer from './products/reducer'
// import favoris from ''
// // Struture de notre State

// {
//     basket:{
//         data: [],
//         isLoading: false,
//         error: null
//     }
// }
// {
//     products:{
//         data: [],
//         isLoading: false,
//         error: null
//     }
// }
export default combineReducers({
    products: ProductsReducer,
    basket: BasketReducer
})