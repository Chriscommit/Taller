const Authentification = require('../auth/authentification');


module.exports = (app, db)=>{

    const userModel = require('../models/UserModel')(db);

   app.get('/api/checkToken', Authentification, async (req, res, next)=>{

        let user = await userModel.getUserByMail(req.email); 
        console.log(user);
        res.json({status: 200, msg: "token valide ", user: user})
    })

}