import gql from "graphql-tag";

export default gql`
  query ListTodos {
    listToDos {
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
