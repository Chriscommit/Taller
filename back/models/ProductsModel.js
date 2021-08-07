module.exports = (_db) =>{
    db = _db
    return ProductsModel
}

class ProductsModel {

    static async getAllProducts(){
        return db.query('SELECT products.id, products.brand, products.model, products.quantity, products.description, products.price, pictures_product.path_picture, categories.name AS category from products INNER JOIN pictures_product ON products.id = pictures_product.product_id INNER JOIN categories ON products.category = categories.id')
                 .then( result => {
                     return result
                 })
                 .catch( error => {
                     console.log(error)
                     return error
                 })
    }

    static async getProduct(productId){
        return db.query('SELECT * from products WHERE id = ?',[productId])
                 .then( result => {
                     return result
                 })
                 .catch( error => {
                     return error
                 })
    }

}