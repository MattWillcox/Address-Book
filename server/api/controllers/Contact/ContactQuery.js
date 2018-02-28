const {
  GraphQLString,
  GraphQLList,
} = require('graphql');

const ContactType = require('../../models/Contact/ContactType');
const Contact = require('../../models/Contact/Contact');

const searchQuery = {
  type: new GraphQLList(ContactType),
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
  },
  resolve: (contact, args) => {
    if (Object.keys(args).length !== 0) {
      return Contact.findAll({
        where: {
          $or: [{
            firstname: {
              $like: `%${args.name}%`,
            },
          }, {
            lastname: {
              $like: `%${args.name}%`,
            },
          }],
        },
      });
    }
    return Contact.findAll();
  },
};

module.exports = {
  searchQuery,
};

