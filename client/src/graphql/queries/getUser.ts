import gql from "graphql-tag";

export default gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
`;
