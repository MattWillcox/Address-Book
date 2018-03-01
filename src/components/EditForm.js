import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class EditForm extends Component {
  render() {
    const { handleSubmit, initialValues } = this.props
    return (
      <form onSubmit={handleSubmit} {...initialValues}>
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
            <Field name="phone" component="input" type="tel" pattern="[0-9]{10}" />
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
}

EditForm = reduxForm({
  form: 'edit',
})(EditForm)

export default EditForm;