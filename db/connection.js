const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}
console.log(ENV, "??")
const config =
  ENV === "production" ? {connectionString: process.env.DATABASE_URL} : {};
console.log(ENV,config)
const db = new Pool(config)
module.exports = db
