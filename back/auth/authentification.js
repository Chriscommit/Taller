const jwt = require('jsonwebtoken');
const secret = require('../conf/database').token.secret

const Authentification = (req, res, next)=>{

    const token = req.headers['x-access-token'];
    console.log('Token dans Authentification',token);
    
    jwt.verify(token, secret, (err, decode)=>{
        console.log(decode);
        
        if(err) {
          console.log(err);
          res.json({status: 401, err: err})
        } else {
            req.id = decode.id;
            req.email = decode.email;
            next();
        }
    })
    
    
}

module.exports = Authentification;