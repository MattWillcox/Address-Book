import React from 'react';

const moveCaretAtEnd = (e) => {
  var temp_value = e.target.value
  e.target.value = ''
  e.target.value = temp_value
}


const ContactList = props => {
  return (
    <div className="contactListNames">
    <div className="searchContacts">
      <h1>All Contacts</h1>
      <input className="search" type="text" placeholder="Search" autoFocus defaultValue={props.searchValue} onFocus={moveCaretAtEnd} onChange={props.handleChange} />
    </div>
      {props.contacts.map((contact, i) => (
          <div className="contactName" key={contact.contactid} onClick={() => props.handleContactClick(i)}>
              {`${contact.lastname},  ${contact.firstname}`}
          </div>
      ))}
    </div>
  )
}

export default ContactList;