import gql from "graphql-tag";

export default gql`
  query GetToDo($id: ID) {
    getToDo(id: $id) {
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
