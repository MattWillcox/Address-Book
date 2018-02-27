const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const contactQuery = require('./Contact/ContactQuery');
const {
  createContact,
  updateContact,
  deleteContact,
} = require('./Contact/ContactMutation');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    Contact: contactQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    createContact,
    updateContact,
    deleteContact,
  }),
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = Schema;
