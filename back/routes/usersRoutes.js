const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}
let secret = process.env.TOKEN_SECRET || config.token.secret;
const mail = require('../lib/mailing');

// const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);
    
    //route d'ajout d'un utilisateur avec envoi de mail de validation ICI
    app.post('/api/user/add', async (req,  res, next)=>{
        let result = await userModel.saveOneUser(req);

        if(result.code) {
            res.json({status: 500, err: result})
        }

        if(result.status === 501 ) {
            res.json(result)        
        }
        
        
        
        mail(
            req.body.email, 
            "validation de votre compte", 
            "Bienvenu sur commersaas", 
            'Pour valider votre mail, cliquez <a href="http://localhost:8000/api/v1/user/validate/'+result.key_id+'">ici<a/> !'
            )
        res.json({status: 200, msg: "Utilisateur enregistré"})
    })
    
    //route de validation (en fonction d'un token (key_id))
    app.get('/api/user/validate/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        console.log(key_id)
        let validate = await userModel.updateValidateUser(key_id);
        if(validate.code) {
            res.json({msg: 'probleme', error: validate});
        }
        res.send('Bravo compte validé !');
    })
    
    //route d'oubli de passaword
    app.post('/api/user/forgot', async (req, res, next)=>{
        let result = await userModel.updateKeyId(req.body.email);
         
        if(result.code) {
             res.json({status: 500, msg: "nous n'avons pas pu envoyer un email", error: result});
         }
         let key_id = result.key_id;
         mail(
            req.body.email, 
            "changement de mot de passe", 
            "Mot de passe oublié ?", 
            'Pour modifier votre mot de passe, cliquez <a href="http://localhost:8000/api/v1/user/changePassword/'+key_id+'">ici<a/> !'
            );
         
         res.json({status: 200, msg: "email envoyé"})
    })
    
    //route d'affichage de la page de modification de password (render de la template ejs)
    app.get('/api/user/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        
        res.render('forgot', {key_id: key_id, error: null})
    })
    
    //route d'envoi du nouveau password
    app.post('/api/user/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        let error = null
        if(req.body.password1 !== req.body.password2) {
            error = "Vos deux mots de passe ne sont pas identique !";
        } else {
            let result = await userModel.updatepassword(req.body.password1, key_id);
            if(result.code) {
                error = "le mot de passe ne s'est pas modifié !"
            } else {
                error = "le mot de passe bien modifié !"
            }
            
        }
        
        res.render('forgot', {key_id: key_id, error: error})
    })
    
    //route de login
    app.post('/api/user/login', async (req,  res, next)=>{
        let user = await userModel.getUserByMail(req.body.email);
        if(user.length === 0) {
            res.json({status: 404, msg: "email inexistant dans la base de donnée"})
        } else {
            if(user[0].validate === "no") {
                res.json({status: 403, msg: "Votre compte n'est pas validé"})
            }
    
            let same = await bcrypt.compare(req.body.password, user[0].password);
            if(same) {
    
                let infos = {id: user[0].id, email: user[0].email}
                let token = jwt.sign(infos, secret);
    
                res.json({status: 200, msg: "connecté", token: token, user: user[0]})
                
    
            } else {
                res.json({status: 401, msg: "mauvais mot de passe"})
            }
        }
        
        
    })
    
    
    
}


/*dans la route d'oubli du password, on met à jour le key_id en fonction de son mail puis on envoi un mail avec un lien qui renvoi vers la route d'affiche de la page modification du password (on oubli pas de glisser sournoisement le key_id dans l'url du href

    dans le route d'affichage du nouveau mot passe à rentrer on envoi un render avec la data key_id récupéré en paramètre
    
    dans la route d'envoi du nouveau mot de passe
        
        1 on récup le key_id 
        2 on initialise une variable error à null
        3 on check si les deux password ajouté sont identiques (condition) si ils sont identiques, on met à jour le password (fonction du model)
        si la requète à échoué on envoi une erreur sinon error renverra que le mot de passe a été modifié
        4 on fait un render de nouveau de la page ejs en renvoyant les datas key_id et error
*/