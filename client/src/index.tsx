import React from "react";
import ReactDOM from "react-dom";
import Amplify, { Auth } from "aws-amplify";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { AUTH_TYPE } from "aws-appsync";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";

/** Ant design */
import "antd/dist/antd.css";
import { GlobalStyles } from "./global";

/** App entry */
import App from "./App";

/** AWS config */
import {
  UserPoolClientId,
  UserPoolId,
  GraphQlApiUrl,
} from "./aws-exports.json";

/** React reporting */
import reportWebVitals from "./reportWebVitals";

const config: any = {
  url: GraphQlApiUrl,
  region: process.env.REACT_APP_REGION,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    apiKey: UserPoolId,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
};

Amplify.configure({
  Auth: {
    region: `${process.env.REACT_APP_REGION}`,
    userPoolId: UserPoolId,
    userPoolWebClientId: UserPoolClientId,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink(config),
    createSubscriptionHandshakeLink(config),
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
