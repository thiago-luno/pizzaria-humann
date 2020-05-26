const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const token = require('../util/generateToken');

module.exports = {
   
    async create(request, response) {
        const { email, fullname, phone, password } = request.body;
        
        if(await connection('users').where('email', email).first()) {
            return response.status(400).json({ error: 'Usuário já existe'});
        }

        const hash = await bcrypt.hash(password, 10);

        await connection('users').insert({
            email,
            fullname,
            phone,
            "password" : hash,
        })

        const user = {
            email,
            fullname,
            phone 
        }
    
        return response.json({ 
            user, 
            token: token.generateToken({ id: user.id }), 
        });
    }
}