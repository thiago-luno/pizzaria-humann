
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
        table.increments();
        table.string('orderNumber').notNullable();
        table.timestamps();
        table.string('orderUser').notNullable();
        table.string('orderDetails').notNullable();
        table.string('orderPayment').notNullable();
        table.float('orderPrice').notNullable();
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('orders');
  };
  