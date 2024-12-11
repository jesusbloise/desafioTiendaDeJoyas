const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432, // Cambia este puerto si tu servidor PostgreSQL usa uno diferente
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
