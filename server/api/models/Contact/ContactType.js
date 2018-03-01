const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'This represents a Contact',
  fields: () => ({
    contactid: {
      type: GraphQLInt,
      resolve: (contact) => contact.contactid,
    },
    firstname: {
      type: GraphQLString,
      resolve: (contact) => contact.firstname,
    },
    lastname: {
      type: GraphQLString,
      resolve: (contact) => contact.lastname,
    },
    phone: {
      type: GraphQLString,
      resolve: (contact) => contact.phone,
    },
    address: {
      type: GraphQLString,
      resolve: (contact) => contact.address,
    },
    email: {
      type: GraphQLString,
      resolve: (contact) => contact.email,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (contact) => contact.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (contact) => contact.updatedAt,
    },
  }),
});

module.exports = ContactType;
