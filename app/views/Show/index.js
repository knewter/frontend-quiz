import React from 'react'
import { gql, graphql } from 'react-apollo'
import {
  Link,
} from 'react-router-dom'

const User = gql`
  query User($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
    }
  }
`

class Show extends React.PureComponent {
  render() {
    const { data } = this.props
    if(data.loading){
      return (<p>Loading</p>)
    } else {
      const user = data.User
      return (
        <div>
          <Link to='/'>&lt;- back</Link>
          <h2>{user.firstName} {user.lastName}</h2>
        </div>
      )
    }
  }
}

export default graphql(User, { options: ({ match: { params: { id } } }) => ({ variables: { id }}) })(Show)
