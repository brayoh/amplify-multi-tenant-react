import gql from "graphql-tag";

export default gql`
  mutation DeleteToDo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
