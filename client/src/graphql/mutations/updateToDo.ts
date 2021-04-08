import gql from "graphql-tag";

export default gql`
  mutation UpdateToDo($input: ToDoUpdateInput) {
    updateTodo(input: $input) {
      id
      createdAt
      updatedAt
      description
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
