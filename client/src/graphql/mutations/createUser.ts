import gql from "graphql-tag";

export default gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
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
