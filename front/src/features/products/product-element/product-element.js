import React from 'react'
import { API } from '../../../conf/config'

const ProductElement = ({ basket, product, addToBasket, removeToBasket }) => {

    return (

        <article className="product">
            <header className="header">
                <h1 className="title">{product.brand ? product.brand : "Unknown brand" / product.model ? product.model : "Unknown model"}</h1>
                <img src = { product.path_picture ? API.product_url + product.path_picture : API.product_url + "/no-img.png" } className="img" alt="Une montre"/>
                <div className="liseret"></div>
            </header>
            <span className="display-category">{product.category ? product.category : "Unknown category"}</span>
            <span className="price">{product.price ? product.price : "Unknown price" } &euro;</span>
            <p className="description">
                {product.description ? product.description : "No description"}
            </p>
            <div className="container-infos">
                <button className="btn-technic">Caractéristiques</button>
                <button className="btn-advice">Avis / Notes</button>
            </div>
            <div className="container-action-article">
                <form className="form-quantity">
                    <label htmlFor="quantity-selected" className="label-quantity-selected">Quantité : </label>
                    <select id="quantity-selected" name="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </form>
                { product.inBasket ? (
                    <button className="btn-delete-article" onClick= { () =>{ removeToBasket(basket, product); } }>
                        Retirer du panier
                    </button>
                ):(
                    <button className="btn-add-article" onClick = { () => addToBasket(basket, product, "2")} >
                        Ajouter au panier
                    </button>
                )
                }
            </div>
        </article>
    )
}

export default ProductElement