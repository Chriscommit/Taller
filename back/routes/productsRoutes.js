// const Authentification = require('../auth/authentification')

module.exports = (app, db) => {

    const ProductsModel = require('../models/ProductsModel')(db)

    app.get('/api/products', async(req, res, next) => {

        let products = await ProductsModel.getAllProducts()
        if(products.code){
            res.json({status:500, err: products})
        }
        res.json({status: 200, products: products, msg:"Get all products OK !"})
    })

    app.get('/api/product/:productId', async(req,res,next) =>{

        let product = await ProductsModel.getProduct(req.params.productId)
        if(product.code){
            res.json({status:500, err: product})
        }
        res.json({status: 200, product: product , msg:"Get one products OK !"})
    })
}