const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
   
    async create(request, response) {
        const { orderUser, data, orderDetails, orderPayment, orderPrice } = request.body;
        const orderNumber = crypto.randomBytes(4).toString('HEX');
        
        await connection('orders').insert({
            orderNumber,
            orderUser: JSON.stringify(orderUser),
            orderDetails : JSON.stringify(orderDetails),
            orderPayment,
            orderPrice,
            created_at: data,
            updated_at: data,
        })

        return response.json({ order: orderNumber })  
    },

    async index(request, response) {
        const orders =  await connection('orders').select("*");
        
        return response.json({ orders })

    }
}