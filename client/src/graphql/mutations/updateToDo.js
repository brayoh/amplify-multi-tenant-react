import gql from "graphql-tag";

export default gql`
  mutation UpdateToDo($input: ToDoUpdateInput) {
    updateTodo(input: $input) {
      id
      createdAt
      description
      updatedAt

      completed
    }
  }
`;
