import React from 'react'
import { gql, graphql } from 'react-apollo'
import {
  Link,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { updateForm, resetForm } from '../../redux/Actions'

const CreateUser = gql`
  mutation createUser($firstName: String!, $lastName: String!) {
    createUser(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

class Create extends React.PureComponent {
  createUser() {
    let { history, resetForm } = this.props
    this.props.mutate({
      variables: {
        firstName: this.props.firstName,
        lastName: this.props.lastName
      }
    })
      .then(({ data }) => {
        history.push(`/show/${data.createUser.id}`)
        resetForm()
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  render() {
    const { firstName, lastName, set, resetForm } = this.props
    return (
      <div>
        <div>
          <label>
            First name:
            <input type='text' value={firstName} onChange={set('firstName')} />
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input type='text' value={lastName} onChange={set('lastName')} />
          </label>
        </div>
        <button onClick={resetForm}>Reset</button>
        <button onClick={this.createUser.bind(this)}>Create User</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.forms.create.firstName,
    lastName: state.forms.create.lastName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    set: key => evt => {
      dispatch(updateForm({ form: 'create', key: key, value: evt.target.value}))
    },
    resetForm: () => {
      dispatch(resetForm({ form: 'create' }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(CreateUser)(Create))
