import React from "react";
import { Route, Redirect } from "react-router-dom";

/** Helpers */
import { validateToken } from "../utils/helpers";

/** Constants */
import { AUTH_USER_TOKEN_KEY } from "../utils/constants";

const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return validateToken(localStorage.getItem(AUTH_USER_TOKEN_KEY)) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
