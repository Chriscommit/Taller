import { getAllProducts, saveOneProduct, deleteOneProduct } from "../../api/products"

export const REQUEST_PRODUCTS = "request products"
export const FETCH_PRODUCTS = "fetch products"
export const FETCH_PRODUCTS_SUCCESS = "fetch products success"
export const FETCH_PRODUCTS_ERROR = "fetch products error"

export const TRY_ADD_PRODUCT = "try add product"
export const ADD_PRODUCT_SUCCESS = "add product success"
export const ADD_PRODUCT_ERROR = "add product error"

export const TRY_REMOVE_PRODUCT = "try remove product"
export const REMOVE_PRODUCT_SUCCESS = "remove product success"
export const REMOVE_PRODUCT_ERROR = "remove product error"

export const requestProducts = () => ({
    type: REQUEST_PRODUCTS
})

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    products
})

export const fetchProductsError = error => ({
    type: FETCH_PRODUCTS_ERROR,
    error
})

export const fetchAllProducts = () => dispatch =>{

        dispatch(requestProducts())

        getAllProducts().then( response => {
            dispatch(fetchProductsSuccess(response))
        }, error => {
            dispatch(fetchProductsError(error))
        })
}

export const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    product
})

export const addProductError = error => ({
    type: ADD_PRODUCT_ERROR,
    error
})

export const tryAddProduct = (newProduct) => dispatch => {

    // return saveOneProduct(newProduct)
    //     .then( response => {
    //         dispatch(addProductSuccess(newProduct))
    //         return response
    //     })
    //     .catch( error => {
    //         dispatch(addProductError(error))
    //     })
}

export const removeProductSuccess = products => ({
    type: REMOVE_PRODUCT_SUCCESS,
    products
})

export const removeProductError = error => ({
    type: REMOVE_PRODUCT_ERROR,
    error
})

export const tryRemoveProduct = productId => dispatch => {
    // deleteOneProduct(productId)
    // .then( product => {
    //     dispatch(removeProductSuccess(product))
    //     return product
    // })
    // .catch( error => {
    //     dispatch(removeProductError(error))
    // })
}

