import gql from 'graphql-tag'

export default gql`
  mutation(
    $id: Int!
    $email: String
    $username: String
    $name: String
    $profile_image: String
    $website_url: String
    $bio: String
    $location: String
    $twitter_username: String
    $github_username: String
  ) {
    updateUserInfo(
      id: $id
      email: $email
      username: $username
      profile_image: $profile_image
      website_url: $website_url
      bio: $bio
      location: $location
      name: $name
      twitter_username: $twitter_username
      github_username: $github_username
    ) {
      email
      username
      profile_image
      website_url
      bio
      location
      twitter_username
      github_username
    }
  }
`
