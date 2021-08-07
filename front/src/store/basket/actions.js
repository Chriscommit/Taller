// import { API } from "../../conf/config"

export const REQUEST_BASKET = "request basket"
export const FETCH_BASKET = "fetch basket"
export const FETCH_BASKET_SUCCESS = "fetch basket success"
export const FETCH_BASKET_ERROR = "fetch basket error"

export const TRY_ADD_PRODUCT_TO_BASKET = "try add product to basket"
export const ADD_PRODUCT_TO_BASKET_SUCCESS = "add product to basket success"
export const ADD_PRODUCT_TO_BASKET_ERROR = "add product to basket error"

export const TRY_REMOVE_PRODUCT_TO_BASKET = "try remove product to basket"
export const REMOVE_PRODUCT_TO_BASKET_SUCCESS = "remove product to basket"
export const REMOVE_PRODUCT_TO_BASKET_ERROR = "remove product to basket error"

export const FILTERS = {
    SHOW_ALL : "SHOW_ALL",
    SHOW_SPORT : "SHOW_SPORT",
    SHOW_VINTAGE : "SHOW_VINTAGE",
    SHOW_LUXE : "SHOW_LUXE",
    SHOW_COLLECTION : "SHOW_COLLECTION"
}

export const requestBasket = () => ({
    type: REQUEST_BASKET
})

export const fetchBasketSuccess = basket => ({
    type: FETCH_BASKET_SUCCESS,
    basket
})

export const fetchBasketError = error => ({
    type: FETCH_BASKET_ERROR,
    error
})

export const fetchBasket = () => dispatch => {
    
    try{
        dispatch(requestBasket())
        let basket
        localStorage.getItem("taller-basket") ? basket = localStorage.getItem("taller-basket") : localStorage.setItem("taller-basket", [])
        dispatch(fetchBasketSuccess(JSON.parse(basket)))
    }catch(e){
        dispatch(fetchBasketError(e))
    }
}

export const addProductToBasketSuccess = product => ({
    type: ADD_PRODUCT_TO_BASKET_SUCCESS,
    product
})

export const addProductToBasketError = error => ({
    type: ADD_PRODUCT_TO_BASKET_ERROR,
    error
})

export const tryAddProductToBasket = (basket, newProduct, quantity) => dispatch => {

    try{
        dispatch(requestBasket())
        console.log("ETAT INITIAL BASKET",basket)
    
        let indexProductExist = basket.findIndex( product => product.id === newProduct.id)

        if(indexProductExist === -1){
            newProduct.quantity = parseInt(quantity)
            newProduct.inBasket = true
            basket.push(newProduct)
        }else{
            basket[indexProductExist].quantity += parseInt(quantity)
            basket[indexProductExist].inBasket = true
        }
        console.log("BASKET AFTER ACTION:", basket)
        let newBasket = JSON.stringify(basket)
        window.localStorage.setItem("taller-basket", newBasket)
        dispatch(addProductToBasketSuccess([basket]))

    }catch(e){
        dispatch(addProductToBasketError(e))
    }

}

export const removeProductToBasketSuccess = basket => ({
    type: REMOVE_PRODUCT_TO_BASKET_SUCCESS,
    basket
})

export const removeProductToBasketError = error => ({
    type: REMOVE_PRODUCT_TO_BASKET_ERROR,
    error
})

export const tryRemoveProductToBasket = (basket, theProduct) => dispatch => {
    
    dispatch(requestBasket())
    theProduct.inBasket = false
    let newBasket = basket.filter(product => product.id !== theProduct.id);
    try{
        let basket = JSON.stringify(newBasket);
        window.localStorage.setItem('taller-basket', basket);
        dispatch(removeProductToBasketSuccess(basket))
    }catch(e){
        dispatch(removeProductToBasketError(e))
    }
}

