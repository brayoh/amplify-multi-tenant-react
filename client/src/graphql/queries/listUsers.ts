import gql from "graphql-tag";

export default gql`
  query ListUsers {
    listUsers {
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
