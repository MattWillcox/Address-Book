import React from 'react';

const formatPhoneNumber = (s) => {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

const SelectedContact = props => {
  if(props.contactSelected.firstname) {
    const { firstname, lastname, phone, email, address } = props.contactSelected;
    return (
      <div className="contactInformation">
        <button className="editButton" onClick={props.handleEdit}>edit</button>
        <h1 className="contactNameHeader">{`${firstname} ${lastname}`}</h1>
        <div className="rowTitles">
          <div className="row">Phone:</div>
          <div className="row">Email:</div>
          <div className="row">Address:</div>
        </div>
        <div className="rowValues">
          <div className="row">{formatPhoneNumber(phone)}</div>
          <div className="row">{email}</div>
          <div className="row">{address}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="noContactSelected">
      <h1 className="contactNameHeader">Select a Contact from your Address Book</h1>
    </div>
  )
}

export default SelectedContact;