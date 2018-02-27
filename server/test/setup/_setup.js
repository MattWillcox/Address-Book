const bodyParser = require('body-parser');
const express = require('express');
const mapRoutes = require('express-routes-mapper');
const GraphHTTP = require('express-graphql');

const config = require('../../config/');
const database = require('../../config/database');
const Schema = require('../../api/controllers/index');

process.env.NODE_ENV = 'testing';

const beforeAction = async () => {
  const testapp = express();
  const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');

  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());

  // public REST API
  testapp.use('/rest', mappedOpenRoutes);

  // private GraphQL API
  testapp.get('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: false,
  }));
  testapp.post('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: false,
  }));

  await database.authenticate();
  await database.drop();
  await database.sync().then(() => console.log('Connection to the database has been established successfully'));

  return testapp;
};

const afterAction = async () => {
  await database.close();
};


module.exports = { beforeAction, afterAction };