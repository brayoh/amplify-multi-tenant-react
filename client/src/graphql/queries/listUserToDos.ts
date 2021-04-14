import gql from "graphql-tag";

export default gql`
  query ListUserTodos {
    listUserTodos {
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
