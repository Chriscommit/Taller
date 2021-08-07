import React, { useEffect }from 'react'
import { connect } from 'react-redux'
import ProductElement from './products/product-element/product-element'
import Loading from '../components/utils/loading'
import { basketProductsListSelector, basketIsLoadingSelector } from '../store/basket/selectors'
import { fetchBasket, tryRemoveProductToBasket, tryAddProductToBasket } from '../store/basket/actions'

const Basket = ({basket, fetchBasket, isLoading, tryRemoveProductToBasket, tryAddProductToBasket}) => {

        console.log("BASKET COMPONENT BASKET:",basket)
    useEffect(() =>{
        fetchBasket()
    },[])

    return (
        <section className="products-section">
        <div className="header-products-section">
            <h1 className="title">Panier</h1>
            { basket.length > 0 &&
                <button className="btn-validate-basket">Valider mon panier</button>
            }
        </div>
        <div className="products">
            { isLoading ? (
                <Loading/>
            ):
                basket.length > 0 ? (basket.map((product,index) => (
                    <ProductElement
                        product = { product }
                        key= { product.id + product.brand + index}
                        addToBasket = { tryAddProductToBasket }
                        removeToBasket = {tryRemoveProductToBasket}
                        basket = { basket }
                    />
                ))):(
                    <p className="no-panier">Vous n'avez rien dans votre panier</p>
                )
            } 
        </div>
            { basket.length > 0 &&
                <button className="btn-validate-basket">Valider mon panier</button>
            }
        </section>
    )
}


const mapStateToProps = (store) =>{
    return {
        basket: basketProductsListSelector(store),
        isLoading: basketIsLoadingSelector(store)
    }
}

const mapDispatchToProps = {
    fetchBasket,
    tryAddProductToBasket,
    tryRemoveProductToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);