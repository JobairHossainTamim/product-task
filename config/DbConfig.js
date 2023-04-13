const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'sql12.freemysqlhosting.net',
      user: 'sql12612542',
      password: 'YZzeiV7mSB',
      database: 'sql12612542'
    }
  });
  
  module.exports = knex;