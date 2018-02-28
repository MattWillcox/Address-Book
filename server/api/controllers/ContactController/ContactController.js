
const Contact = require('../../models/Contact/Contact');

const ContactController = () => {
  const getAll = (req, res) => {
    Contact.findAll()
      .then((contactList) => {
        if (!contactList) {
          return res.stats(400).json({ msg: 'Bad Request: No contacts found' });
        }
        return res.status(200).json({ data: contactList });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  return {
    getAll,
  };
};

module.exports = ContactController;
