import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";

/** Presentational */
import { BodyContainer, NavigationHeader } from "../../components/styled";
import DataList from "../../components/DataList";

/** Constants */
import { AUTH_USER_TOKEN_KEY } from "../../utils/constants";

const App: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, toggleLoading] = useState(false);

  const handleLogout = async () => {
    toggleLoading(true);

    try {
      await Auth.signOut({ global: true }).then(() => {
        toggleLoading(true);
        // delete token from local storage
        localStorage.removeItem(AUTH_USER_TOKEN_KEY);
        // redirect to login
        history.push("/login");
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

  return (
    <React.Fragment>
      <NavigationHeader>
        {loading ? (
          <LoadingOutlined />
        ) : (
          <span onClick={handleLogout}>Logout</span>
        )}
      </NavigationHeader>
      <BodyContainer>
        <div>
          <DataList />
        </div>
      </BodyContainer>
    </React.Fragment>
  );
};

export default App;
