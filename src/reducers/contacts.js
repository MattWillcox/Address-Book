export function contactsHasErrored(state = false, action) {
  switch (action.type) {
    case 'CONTACTS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function contactsIsLoading(state = false, action) {
  switch (action.type) {
    case 'CONTACTS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function contacts(state = { Contact: [] }, action) {
switch (action.type) {
    case 'CONTACTS_FETCH_DATA_SUCCESS':
      return action.contacts.data;
    case 'CONTACTS_POST_DATA_SUCCESS': {
      const newContact = state.Contact.map(contact => {
        if (contact.contactId === action.contacts.data.updateContact.contactId) {
          return action.contacts.data.updateContact;
        }
        return contact;
      })
      console.log(newContact);
      return { ...state, Contact: newContact }
    }
    default:
      return state;
  }
}