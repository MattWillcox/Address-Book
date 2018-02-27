const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  },
};

const tableName = 'contacts';

const Contact = sequelize.define('Contact', {
  contactId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
}, { instanceMethods, tableName });

module.exports = Contact;
