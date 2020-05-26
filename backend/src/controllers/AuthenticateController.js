const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const token = require('../util/generateToken');
// const authMiddleware = require('../middlewares/auth');

module.exports = {
   
    async create(request, response) {
        const { email, password } = request.body;
        const user = await connection('users')
        .where('email', email)
        .select()
        .first();

        if(!user) {
            return response.status(400).json({ error: 'Usuário não encontrado'});
        }

        if(!await bcrypt.compare(password, user.password)) {
            return response.status(400).json({ error: 'Senha incorreta'});
        }

        user.password= undefined;

        return response.json({ 
            user, 
            token: token.generateToken({ id: user.id }),
        });
    }
}