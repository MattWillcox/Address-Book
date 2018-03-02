import React from 'react';
import { shallow, mount } from 'enzyme';
import ConnectedApp, { App }from './App';
import ContactList from './components/ContactList';
import EditForm from './components/EditForm';
import SelectedContact from './components/SelectedContact';
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'


const Contact = [{
  "contactid": 1,
  "firstname": "Cameron",
  "lastname": "Dubas",
  "phone": "6047280012",
  "address": "289 Abbott St., Vancouver, BC, V3M 2L7",
  "email": "cameron@changeheroes.com"
}];

describe('Shallow Render React Components', () => {

  it('App renders without crashing', () => {
    shallow(<App contacts={Contact} editState={false} fetchData={jest.fn()}/>);
  });

  it('ContactList renders without crashing', () => {
    shallow(<ContactList 
      searchValue={''}
      contacts={Contact}
      handleChange={jest.fn()}
      handleContactClick={jest.fn()} />);
  });

  it('EditForm renders without crashing', () => {
    shallow(<EditForm onSubmit={jest.fn()} initialValues={Contact[0]}/>);
  });

  it('SelectedContact renders without crashing', () => {
    shallow(<SelectedContact contactSelected={Contact[0]} handleEdit={jest.fn()}/>);
  });
});

describe('Shallow Render w/ Connected Redux', () => {
  it('ConnectedApp renders without crashing', () => {
    shallow(<ConnectedApp store={configureStore()({ Contact })} />);
  })
});


