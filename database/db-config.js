const knex = require('knex');

const knexfile = ('../knexfile');

const environment = process.env.NODE_ENV || 'production';

module.exports = knex(knexfile[environment]);