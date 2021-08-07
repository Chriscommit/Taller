import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import ProductElement from './product-element/product-element'
import Loading from '../../components/utils/loading'

import { fetchAllProducts } from '../../store/products/actions'
import { fetchBasket } from '../../store/basket/actions'
import { tryAddProductToBasket, tryRemoveProductToBasket } from '../../store/basket/actions'
import { setFilter, filters } from '../../store/filter_categories/actions'

import { productsListSelector, productsIsLoadingSelector } from '../../store/products/selectors'
import { basketProductsListSelector } from '../../store/basket/selectors'

const Products = ({products, basket, isLoading, fetchAllProducts, fetchBasket, setFilter, tryRemoveProductToBasket, tryAddProductToBasket}) => {

    useEffect(()=> {
        fetchAllProducts()
        fetchBasket()
    },[])
    
    console.log("COMPONENT PRODUCTS BASKET:",basket)

    return (
        <section className="products-section">
            <div className="header-products-section">
                <h1 className="title">Nos produits</h1>
                <form className="form-searchbar">
                    <input type="text" name="searchproducts" className="input-searchbar" placeholder="Cherchez une montre..."/>
                    <select name="category" className="category-watch">
                        <option value="all" onClick={() => { setFilter(filters.SHOW_ALL)}}>All</option>
                        <option value="sport" onClick={() => { setFilter(filters.SHOW_SPORT)}}>Sport</option>
                        <option value="luxe" onClick={() => { setFilter(filters.SHOW_LUXE)}}>Luxe</option>
                        <option value="vintage" onClick={() => { setFilter(filters.SHOW_VINTAGE)}}>Vintage</option>
                        <option value="collection" onClick={() => { setFilter(filters.SHOW_COLLECTION)}}>Collection</option>
                    </select>
                    <button className="btn-searchbar">Search</button>
                </form>
            </div>
            <div className="products">
                { isLoading ? (
                    <Loading/>
                ):
                    products.length > 0 && products.map( (product,index) => {
                        return (
                                <ProductElement
                                    product = { product }
                                    key= { product.id + product.brand + index}
                                    addToBasket = { tryAddProductToBasket }
                                    removeToBasket = { tryRemoveProductToBasket}
                                    basket = { basket }
                                />
                        )
                    })}
            </div>
        </section>
    )
}

const mapStateToProps = (store) =>{
    return {
        products: productsListSelector(store),
        isLoading: productsIsLoadingSelector(store),
        basket: basketProductsListSelector(store)
    }
}

const mapDispatchToProps = {
	fetchAllProducts,
    fetchBasket,
    setFilter,
    tryAddProductToBasket,
    tryRemoveProductToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);