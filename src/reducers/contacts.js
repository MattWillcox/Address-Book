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
      default:
          return state;
  }
}
