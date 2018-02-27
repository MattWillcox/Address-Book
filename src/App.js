import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactsFetchData } from './actions';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contactSelected: false,
    }
  }
  componentDidMount() {
      this.props.fetchData('http://localhost:2017/graphql?query={Contact{firstname, lastname, phone, address, email}}');
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

      if (this.props.hasErrored) {
          return <p>Sorry! There was an error loading the contacts</p>;
      }
      if (this.props.isLoading) {
          return <p>Loading…</p>;
      }
      return (
        <div className="main">
          <div className="contactListNames">
            <div className="searchContacts">
              <h1>All Contacts</h1>
              <input className="search" type="text" placeholder="Search" />
            </div>
              {this.props.contacts.map((contact, i) => (
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
