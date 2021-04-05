import gql from "graphql-tag";

export default gql`
  mutation UpdateUser($input: UserUpdateInput) {
    updateUser(input: $input) {
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
