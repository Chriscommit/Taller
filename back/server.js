const express = require("express") // framework de gestion des requettes http
const morgan = require("morgan") // librairie logger pour toutes les requetes http, afin de debug en development
const cors = require("cors") // librairie de gestion des cors des requetes http
const path = require("path") // librairie de gestion des path
const app = express() // Invocation de la fonction express
const mysql = require('promise-mysql')
var config = require("./conf/config")

const PORT = process.env.PORT || 8000 // Définition du port

// Middlewares qui s'appliquent à toute les routes

app.use(morgan("common")) // Middleware logger pour toutes les requêtes http, onlyDevelopment
app.use(express.static(__dirname +'/public')) // Middleware de gestion des ressources statiques (images...)
app.use(express.json()) // Parser le body encodés en json et de le mettre sur l'objet req.body
app.use(express.urlencoded({extended: false})) // Parser le body encodés en urlEncoded et de le mettre sur l'objet req.body
app.use(cors()) // Middleware gestion des cors

console.log("__dirname :", __dirname)


// Configuration de la database
const HOST = process.env.HOST_DB || config.db.host
const DATABASE = process.env.DATABASE_DB || config.db.database;
const USER = process.env.USER_DB || config.db.user;
const PASSWORD = process.env.PASSWORD_DB || config.db.password;

// Appel de nos routes
const productsRoutes = require("./routes/productsRoutes")

// Utilisation de la librairie promise-mysql afin de créer une connexion avec la database
mysql.createConnection({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD
}).then( db => {
    console.log('DATABASE connected')
    setInterval(
        async function(){
            let res = await db.query('SELECT 1')
        }
    ,10000)

    app.get('/', (req,res) =>{
        res.json({status:200, msg:"SERVER.js API BACK OK"})
    })
    
    productsRoutes(app,db)
})


// Ecoute du port défini
app.listen(PORT, () => {
    console.log(`Port listened : ${ PORT }`)
})