
const Contact = require('../../models/Contact/Contact');

const ContactController = () => {
  const register = (req, res) => {
    const body = req.body;

    return Contact.create({
      email: body.email,
    })
      .then((contact) => res.status(200).json({ contact }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
      Contact.findOne({
        where: {
          email,
        },
      })
        .then((contact) => {
          if (!contact) {
            return res.status(400).json({ msg: 'Bad Request: Contact not found' });
          }
          return res.status(200).json({ contact });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        });
    }
  };

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
    register,
    login,
    getAll,
  };
};

module.exports = ContactController;
