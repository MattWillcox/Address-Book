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
  /* Resolve function
  * returns: array of contacts
  * Checks to see if there are any args, in this case we are looking for names
  * that the user is searching for. If we find any, we then check if the user
  * entered multiple names or just one and then we query our DB respectively.
  */
  resolve: (contact, args) => {
    if (Object.keys(args).length !== 0) {
      let namesRegexp;
      if (args.name) {
        namesRegexp = args.name.trim().split(' ');
        if (namesRegexp.length === 1) {
          return Contact.findAll({
            where: {
              $or: [{
                firstname: {
                  $regexp: namesRegexp[0],
                },
              }, {
                lastname: {
                  $regexp: namesRegexp[0],
                },
              }],
            },
          });
        } else if (namesRegexp.length === 2) {
          return Contact.findAll({
            where: {
              $or: [{
                $and: [{
                  firstname: {
                    $regexp: namesRegexp[0],
                  },
                }, {
                  lastname: {
                    $regexp: namesRegexp[1],
                  },
                }],
              }, {
                $and: [{
                  firstname: {
                    $regexp: namesRegexp[1],
                  },
                }, {
                  lastname: {
                    $regexp: namesRegexp[0],
                  },
                }],
              }],
            },
          });
        }
        return [];
      }
    }
    return Contact.findAll();
  },
};

module.exports = {
  searchQuery,
};

