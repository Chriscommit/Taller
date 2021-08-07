import axios from 'axios'
import { API } from '../conf/config'

export const getAllProducts = () =>{
    return axios.get(API.url+"api/products")
                .then( response =>{
                    return response.data.products
                }, error =>{
                    return error
                })
}

export const deleteOneProduct = (productId) =>{

    return axios.get(API.url + `/api/product/delete/:${productId}`)
                .then( response =>{
                    return response
                })
                .catch( error =>{
                    return error
                })
}

export const saveOneProduct = (req) =>{

    return axios.get(API.url + `/api/product/save`)
                .then( response =>{
                    return response
                })
                .catch( error =>{
                    return error
                })
}

export const updateProduct = (productId) =>{

    return axios.get(API.url + `/api/product/update${productId}`)
                .then( response =>{
                    return response
                })
                .catch( error =>{
                    return error
                })
}