import gql from "graphql-tag";

export default gql`
  mutation createTodo($input: ToDoCreateInput!) {
    createTodo(input: $input) {
      id
      createdAt
      updatedAt
      completed
      description
    }
  }
`;
