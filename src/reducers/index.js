import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux';
import { contacts, contactsHasErrored, contactsIsLoading } from './contacts';
import { toggleEdit } from './interface';

export default combineReducers({
  contacts,
  contactsHasErrored,
  contactsIsLoading,
  toggleEdit,
  form: formReducer,
  routing: routerReducer,
});
