const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const ContactType = require('../../models/Contact/ContactType');
const Contact = require('../../models/Contact/Contact');

const contactQuery = {
  type: new GraphQLList(ContactType),
  args: {
    contactId: {
      name: 'contactId',
      type: GraphQLInt,
    },
    firstname: {
      name: 'firstname',
      type: GraphQLString,
    },
    lastname: {
      name: 'lastname',
      type: GraphQLString,
    },
    phone: {
      name: 'phone',
      type: GraphQLString,
    },
    address: {
      name: 'address',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (contact, args) => Contact.findAll({ where: args }),
};

module.exports = contactQuery;
