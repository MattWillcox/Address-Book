import { combineReducers } from 'redux';
import { contacts, contactsHasErrored, contactsIsLoading } from './contacts';
export default combineReducers({
    contacts,
    contactsHasErrored,
    contactsIsLoading
});
