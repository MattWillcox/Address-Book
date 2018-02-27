const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const ContactType = require('../../models/Contact/ContactType');
const Contact = require('../../models/Contact/Contact');

const createContact = {
  type: ContactType,
  description: 'The mutation that allows you to create a new Contact',
  args: {
    firstname: {
      name: 'firstname',
      type: new GraphQLNonNull(GraphQLString),
    },
    lastname: {
      name: 'lastname',
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      name: 'phone',
      type: new GraphQLNonNull(GraphQLString),
    },
    address: {
      name: 'address',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (contact, { firstname, lastname, phone, address, email }) => (
    Contact
      .create({
        firstname,
        lastname,
        phone,
        address,
        email,
      })
  ),
};
const updateContact = {
  type: ContactType,
  description: 'The mutation that allows you to update an existing Contact by Id',
  args: {
    contactId: {
      name: 'contactId',
      type: new GraphQLNonNull(GraphQLInt),
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
  },
  resolve: (contact, { contactId, firstname, lastname, phone, address, email }) => (
    Contact
      .findById(contactId)
      .then((foundContact) => {
        if (!foundContact) {
          return 'Contact not found';
        }

        const thisFirstname = firstname !== undefined ? firstname : foundContact.firstname;
        const thisLastname = lastname !== undefined ? lastname : foundContact.lastname;
        const thisPhone = phone !== undefined ? phone : foundContact.phone;
        const thisAddress = address !== undefined ? address : foundContact.address;
        const thisEmail = email !== undefined ? email : foundContact.email;

        return foundContact
          .update({
            firstname: thisFirstname,
            lastname: thisLastname,
            phone: thisPhone,
            address: thisAddress,
            email: thisEmail,
          });
      })
  ),
};

const deleteContact = {
  type: ContactType,
  description: 'The mutation that allows you to delete a existing Contact by Id',
  args: {
    contactId: {
      name: 'contactId',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (contact, { id }) => (
    Contact
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  createContact,
  updateContact,
  deleteContact,
};
