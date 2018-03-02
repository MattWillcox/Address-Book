import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactsFetchData, contactsPostData, toggleEdit } from './actions';
import EditForm from './components/EditForm';
import SelectedContact from './components/SelectedContact';
import ContactList from './components/ContactList';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contactSelected: {},
      searchValue: '',
    }
  }
  componentDidMount() {
    this.props.fetchData(`http://localhost:2017/graphql?query={Contact{contactid, firstname, lastname, phone, address, email}}`);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.contactid && nextProps.contacts.Contact) {
      nextProps.contacts.Contact.forEach((contact, index) => {
        if (contact.contactid === Number(this.props.match.params.contactid)) this.setState({ contactSelected: nextProps.contacts.Contact[index] })
      })
    }
  }

  onSearchChange = (event) => {
    this.props.fetchData(`http://localhost:2017/graphql?query={
      Contact(name:"${event.target.value}"){contactid, firstname, lastname, phone, address, email}
    }`);
    this.setState({ searchValue: event.target.value });
  }

  onContactClick = (index) => {
    this.setState({ contactSelected: this.props.contacts.Contact[index] });
  }

  onEdit = () => {
    this.props.toggleEditState();
  }

  onSubmit = values => {
    const { firstname, lastname, phone, address, email } = values;
    const { contactid } = this.state.contactSelected;
    this.props.postData(`http://localhost:2017/graphql?query=mutation{
      updateContact(
        contactid:${contactid},
        firstname:"${firstname}",
        lastname:"${lastname}",
        phone:"${phone}",
        address:"${address}",
        email:"${email}"
      ){contactid,firstname,lastname,phone,address,email}
    }`)
    this.props.toggleEditState()
    this.setState({ contactSelected: {
      firstname,
      lastname,
      phone,
      address,
      email,
      contactid,
    }});
  }

  render() {
    if (this.props.hasErrored) {
        return <div className="error"><p>Sorry! There was an error loading the contacts</p></div>;
    }
    return (
      <div className="main">
        <ContactList
          searchValue={this.state.searchValue}
          contacts={this.props.contacts.Contact}
          handleChange={this.onSearchChange}
          handleContactClick={(i) => this.onContactClick(i)} />
        {(this.props.editState.edit) ? <EditForm onSubmit={this.onSubmit} initialValues={this.state.contactSelected} />
        : <SelectedContact contactSelected={this.state.contactSelected} handleEdit={this.onEdit} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      contacts: state.contacts,
      hasErrored: state.contactsHasErrored,
      isLoading: state.contactsIsLoading,
      editState: state.toggleEdit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(contactsFetchData(url)),
      postData: (url) => dispatch(contactsPostData(url)),
      toggleEditState: () => dispatch(toggleEdit()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
