/**
 * CONFIG MODULE
 */

let config = {};

config.databse = process.env.DATABASE_NEO4J || 'bolt://';
config.PORT = process.env.PORT || 3000;

module.exports = config;