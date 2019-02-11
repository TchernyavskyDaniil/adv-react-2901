import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { userError } from '../../ducks/auth'

class SignInForm extends Component {
  static propTypes = {}

  render() {
    const { error, handleSubmit } = this.props

    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <div>email:</div>
            <div>
              <Field component="input" name="email" />
            </div>
          </div>
          <div>
            <div>password:</div>
            <div>
              <Field component="input" name="password" type="password" />
            </div>
          </div>
          <button type="submit">Sign In</button>
          {error && <span> {error.message} </span>}
        </form>
      </div>
    )
  }
}

export default compose(
  reduxForm({
    form: 'sign-in'
  }),
  connect((state) => ({ error: userError(state) }))
)(SignInForm)
