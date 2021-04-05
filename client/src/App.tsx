import styled from "styled-components";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";

/** Presentational */
import DataList from "./components/DataList";

/** GraphQL Queries */
import listToDos from "./graphql/queries/listToDos";

/** App theme */
import Colors from "./theme/colors";

const BodyContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${Colors.grey};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const CenterContent = styled.div`
  display: flex;
  flex: 1;
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(listToDos);
  const Loader = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  if (loading)
    return (
      <CenterContent>
        <Spin indicator={Loader} />
      </CenterContent>
    );

  if (error) return (<div>{`Error! ${error.message}`}</div>);

  return (
    <BodyContainer>
      <div style={{ backgroundColor: "white" }}>
        <DataList data={data.listToDos} />
      </div>
    </BodyContainer>
  );
};

export default App;
