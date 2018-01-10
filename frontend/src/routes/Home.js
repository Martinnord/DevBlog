import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
const { Header, Content } = Layout

const Home = ({ data: { getPosts = [] } }) => {
  return (
    <ul>
      {getPosts.map(u => <h1 key={u.id}>{u.title}</h1>)}
    </ul>
  )
}

// class Home extends Component {
//   render() {
//     const allPosts = (
//       this.props.data.getPosts.map(u => <h1>{u.title}</h1>)
//     )

//     return (
//       <Layout>
//         <Header>
//           <Menu
//             theme="dark"
//             mode="horizontal"
//           >
//             <Menu.Item>DEVBLOG</Menu.Item>
//           </Menu>
//         </Header>
//         <Content>{allPosts}</Content>
//       </Layout>
//     )
//   }
// }

const getPostsQuery = gql`
  query getPostsQuery {
    getPosts {
      title
      content
    }
  }
`

export default graphql(getPostsQuery)(Home)
