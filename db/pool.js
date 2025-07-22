require('dotenv').config();
const { Pool } = require('pg'); 

module.exports = new Pool({
    host: process.env.HOST,
    user: process.env.DB_ROLE,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

