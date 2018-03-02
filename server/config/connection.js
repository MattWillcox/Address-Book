const development = {
  database: 'address_book',
  username: 'root',
  password: 'password',
  host: 'localhost',
  dialect: 'mysql' || 'postgres' || 'sqlite',
};

const testing = {
  database: 'address_book',
  username: 'root',
  password: 'password',
  host: 'localhost',
  dialect: 'mysql' || 'postgres' || 'sqlite',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql' || 'postgres' || 'sqlite',
};

module.exports = {
  development,
  testing,
  production,
};
