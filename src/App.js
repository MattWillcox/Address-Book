import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { contactsFetchData, contactsPostData, toggleEdit } from './actions';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contactSelected: null,
      searchValue: '',
    }
  }
  componentDidMount() {
    this.props.fetchData(`http://localhost:2017/graphql?query={Contact{contactId, firstname, lastname, phone, address, email}}`);
  }

  onSearchChange = (event) => {
    this.props.fetchData(`http://localhost:2017/graphql?query={Contact(name:"${event.target.value}"){contactId, firstname, lastname, phone, address, email}}`);
    this.setState({ searchValue: event.target.value });
  }

  onContactClick = (index) => {
    this.setState({ contactSelected: this.props.contacts.Contact[index  ] });
  }

  onEdit = () => {
    this.props.toggleEditState();
  }

  onSubmit = values => {
    const { firstname, lastname, phone, address, email } = values;
    const { contactId } = this.state.contactSelected;
    this.props.postData(`http://localhost:2017/graphql?query=mutation{updateContact(contactId:${contactId},firstname:"${firstname}",lastname:"${lastname}",phone:"${phone}",address:"${address}",email:"${email}"){contactId,firstname,lastname,phone,address,email}}`)
    this.props.toggleEditState()
    this.setState({ contactSelected: {
      firstname,
      lastname,
      phone,
      address,
      email,
      contactId,
    }});
  }

  render() {
    let EditForm = props => {
      const { handleSubmit } = props
      return (
      <form onSubmit={handleSubmit}>
        <div className="contactInformation">
          <h1 className="contactEditHeader">Edit Contact</h1>
          <div className="row">
            <label htmlFor="firstname">First Name: </label>
            <Field name="firstname" component="input" type="text" />
          </div>
          <div className="row">
            <label htmlFor="lastname">Last Name: </label>
            <Field name="lastname" component="input" type="text" />
          </div>
          <div className="row">
            <label htmlFor="phone">Phone: </label>
            <Field name="phone" component="input" type="phone" />
          </div>
          <div className="row">
            <label htmlFor="address">Address: </label>
            <Field name="address" component="input" type="address" />
          </div>
          <div className="row">
            <label htmlFor="email">Email: </label>
            <Field name="email" component="input" type="email" />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
      )
    }

    EditForm = reduxForm({
      form: 'edit'
    })(EditForm)

    const SelectedContact = props => {
      if(this.state.contactSelected) {
        const { firstname, lastname, phone, email, address } = this.state.contactSelected;
        return (
          <div className="contactInformation">
            <button className="editButton" onClick={this.onEdit}>edit</button>
            <h1 className="contactNameHeader">{`${firstname} ${lastname}`}</h1>
            <div className="rowTitles">
              <div className="row">Phone:</div>
              <div className="row">Email:</div>
              <div className="row">Address:</div>
            </div>
            <div className="rowValues">
              <div className="row">{phone}</div>
              <div className="row">{email}</div>
              <div className="row">{address}</div>
            </div>
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
                <div className="contactName" key={contact.contactId} onClick={() => this.onContactClick(i)}>
                    {`${contact.lastname},  ${contact.firstname}`}
                </div>
            ))}
        </div>
        {(this.props.editState.edit) ? <EditForm onSubmit={this.onSubmit} /> : <SelectedContact />}
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
