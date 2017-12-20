/** @module config */

let config = {};

config.DATABASE_URL = process.env.DATABASE_NEO4J || 'http://localhost:7474';
config.PORT = process.env.PORT || 8888;

module.exports = config;