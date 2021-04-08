import gql from "graphql-tag";

export default gql`
  query ListUserTodos($id: ID) {
    listUserTodos(id: $id) {
      id
      createdAt
      description
      updatedAt
      completed
      user {
        id
        cognitoId
        createdAt
        email
        firstName
        lastName
        updatedAt
        phoneNumber
      }
    }
  }
`;
