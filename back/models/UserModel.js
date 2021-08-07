const bcrypt = require('bcrypt');
const saltRounds = 10;
let randomId = require('random-id');
let len = 30;
let pattern = 'aA0'
 
module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
    
	static async saveOneUser(req){

		let hash = await bcrypt.hash(req.body.password, saltRounds);
		let key_id = randomId(len, pattern);
		let user = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
		if(user.length > 0) {
			return {status: 501, msg: "Email déjà existant"}
		}
        
	    return db.query('INSERT INTO users (firstName, lastName, email, password, role, validateEmail, key_email, registerDate) VALUES(?, ?, ?, ?, "client", "0", ?, NOW())', [req.body.firstName, req.body.lastName, req.body.email, hash, key_id ])
		.then((result)=>{
			result.key_id = key_id;
			return result
		})
		.catch((err)=>{
			return err
		})
	}
	
	static async updateValidateUser(key_id){

	    let user = await db.query('UPDATE users SET validateEmail = "1" WHERE key_email = ?', [key_id]);

		return user;
	}
	
	static async updateKeyId(email){

	    let key_id = randomId(len, pattern);
	    let user = await db.query('UPDATE users SET key_email = ? WHERE email = ?', [key_id, email]);
		
		let result = {key_id: key_id, user: user}

		return result;
	}
	
	static async updatepassword(newPassword, key_id){
	    let hash = await bcrypt.hash(newPassword, saltRounds);
		let result = await db.query('UPDATE users SET password = ? WHERE key_email = ?', [hash, key_id]);
		return result;
	}
	
	static async getUserByMail(email){
	    let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);

		return user;
	   
	}
}