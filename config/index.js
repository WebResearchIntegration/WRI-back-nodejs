/**
 * CONFIG MODULE
 */

let config = {};

config.DATABASE_URL = process.env.DATABASE_NEO4J || 'http://localhost:7474';
config.PORT = process.env.PORT || 3000;

module.exports = config;