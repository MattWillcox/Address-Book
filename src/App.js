import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactsFetchData } from './actions';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contactSelected: false,
      searchValue: '',
    }
  }
  componentDidMount() {
    this.props.fetchData(`http://localhost:2017/graphql?query={Contact{firstname, lastname, phone, address, email}}`);
  }

  onSearchChange = (event) => {
    this.props.fetchData(`http://localhost:2017/graphql?query={Contact(name:"${event.target.value}"){firstname, lastname, phone, address, email}}`);
    this.setState({ searchValue: event.target.value });
  }

  onContactClick = () => {
    this.setState({ contactSelected: true });
    console.log('clicked');
  }

  render() {

      const SelectedContact = () => {
        
        if(this.state.contactSelected) {
          const { lastname, firstname } = this.props.contacts[0];
          return (
            <div className="contactInformation">
              <h1>{`${firstname} ${lastname}`}</h1>
            </div>
          )
        }
        return (
          <div className="noContactSelected">
            <h1>Select a Contact from your Address Book</h1>
          </div>
        )
      }

      const moveCaretAtEnd = (e) => {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
      }

      if (this.props.hasErrored) {
          return <p>Sorry! There was an error loading the contacts</p>;
      }
      return (
        <div className="main">
          <div className="contactListNames">
            <div className="searchContacts">
              <h1>All Contacts</h1>
              <input className="search" type="text" placeholder="Search" autoFocus defaultValue={this.state.searchValue} onFocus={moveCaretAtEnd} onChange={this.onSearchChange} />
            </div>
              {this.props.contacts.Contact.map((contact, i) => (
                  <div className="contactName" key={i} onClick={this.onContactClick}>
                      {`${contact.lastname},  ${contact.firstname}`}
                  </div>
              ))}
          </div>
          <SelectedContact />
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
      contacts: state.contacts,
      hasErrored: state.contactsHasErrored,
      isLoading: state.contactsIsLoading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(contactsFetchData(url))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
