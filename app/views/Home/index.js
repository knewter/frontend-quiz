import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import {
  Link,
} from 'react-router-dom'

const AllUsers = gql`
  {
    allUsers{
      id
      firstName
      lastName
    }
  }
`

class Home extends React.PureComponent {
  render() {
    const { allUsers } = this.props.data
    const users =
      allUsers
      .map(u => <li>{u.firstName} {u.lastName}</li>)
    return (
      <div>
        <p>Home Component</p>
        <Link to="about">
          Link to about
        </Link>
        <ul>{users}</ul>
      </div>
    )
  }
}

export default graphql(AllUsers)(Home)
