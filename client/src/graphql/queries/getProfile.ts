import gql from "graphql-tag";

export default gql`
  query GetProfile {
    profile {
      cognitoId
      createdAt
      firstName
      email
      id
      lastName
      phoneNumber
      updatedAt
    }
  }
`;
