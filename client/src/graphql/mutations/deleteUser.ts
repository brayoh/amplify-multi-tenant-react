import gql from "graphql-tag";

export default gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
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
