import React from 'react'
import { gql, graphql } from 'react-apollo'
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
    let { data } = this.props
    if(data.loading){
      return (<p>loading...</p>)
    } else {
      let { allUsers } = data
      let users =
        allUsers
        .map((u, i) => <li key={i}><Link to={`/show/${u.id}`}>{u.firstName} {u.lastName}</Link></li>)
      return (
        <div>
          <p>Home Component</p>
          <p>
            <Link to="about">
              Link to about
            </Link>
          </p>
          <p>
            <Link to="create">
              Create new user
            </Link>
          </p>
          <ul>{users}</ul>
        </div>
      )
    }
  }
}

export default graphql(AllUsers)(Home)
