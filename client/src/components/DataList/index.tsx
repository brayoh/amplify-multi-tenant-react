import React from "react";
import styled from "styled-components";
import { List, Checkbox, Input, Button, Popconfirm, message } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useMutation } from "@apollo/client";

/** App theme */
import Colors from "../../theme/colors";

/** GraphQL Queries */
import updateToDo from "../../graphql/mutations/updateToDo";
import createToDo from "../../graphql/mutations/createToDo";
import deleteToDo from "../../graphql/mutations/deleteToDo";
import listToDos from "../../graphql/queries/listToDos";

/** Custom types */
import { ToDo } from "../../utils/custom-types";

const ListContainer = styled.div`
  max-height: 50vh;
  overflow: scroll;
  background-color: ${Colors.white};
`;

const DeleteAction = styled.span`
  color: #1890ff;
  &:hover {
    cursor: pointer;
  }
`;

const DataList = (props: { data: Array<ToDo> }) => {
  const [description, updateDescription] = React.useState("");
  const [updateToDoMutation] = useMutation(updateToDo);
  const [createToDoMutation] = useMutation(createToDo);
  const [deleteToDoMutation] = useMutation(deleteToDo);

  const { data } = props;

  function handleCheck(event: CheckboxChangeEvent, item: ToDo) {
    event.preventDefault();

    const completed =
      typeof item.completed === "boolean" ? !item.completed : true; // boolean check is for items that might be created with a null value as default in dynamo db

    updateToDoMutation({
      variables: { input: { completed, id: item.id } },
      refetchQueries: [
        {
          query: listToDos,
        },
      ],
    })
      .then((res) => message.success("Item updated successfully"))
      .catch((err) => {
        message.error("Error occurred while updating item");
        console.log(err);
      });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    createToDoMutation({
      variables: { input: { description } },
      refetchQueries: [
        {
          query: listToDos,
        },
      ],
    })
      .then((res) => message.success("Item created successfully"))
      .catch((err) => {
        message.error("Error occurred while creating item");
        console.log(err);
      });
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      // user pressed enter
      createToDoMutation({
        variables: { input: { description } },
        refetchQueries: [
          {
            query: listToDos,
          },
        ],
      })
        .then((res) => {
          message.success("Item created successfully");
        })
        .catch((err) => {
          message.error("Error occurred while creating item");
          console.log(err);
        });
    }
  }

  function handleDelete(item: ToDo) {
    deleteToDoMutation({
      variables: { id: item.id },
      refetchQueries: [
        {
          query: listToDos,
        },
      ],
    })
      .then((res) => {
        message.success("Deleted successfully");
      })
      .catch((err) => {
        message.error("Error occurred while deleting item");
        console.log(err);
      });
  }

  return (
    <ListContainer>
      <List
        header={
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Enter todo name"
              value={description}
              onChange={(event) => updateDescription(event.target.value)}
              style={{ marginRight: "10px" }}
              onKeyDown={handleKeyPress}
            />
            <Button name="add" onClick={handleSubmit}>
              add
            </Button>
          </div>
        }
        bordered
        dataSource={data}
        renderItem={(item: ToDo) => (
          <List.Item>
            <Checkbox
              checked={item.completed}
              onChange={(event:  CheckboxChangeEvent) => handleCheck(event, item)}
            >
              {item.description}
            </Checkbox>
            <Popconfirm
              title="Are you sure to delete this item?"
              onConfirm={() => handleDelete(item)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteAction>Delete</DeleteAction>
            </Popconfirm>
          </List.Item>
        )}
      />
    </ListContainer>
  );
};

export default DataList;
