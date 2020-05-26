exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('email').notNullable();
        table.string('fullname').notNullable();
        table.string('phone').notNullable();
        table.string('password').notNullable();
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('users');
  };
  