import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Form, Input, Button, notification, Col, Row } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";

/** Presentational */
import FormWrapper from "../../components/styled/FormWrapper";

/** App constants */
import { AUTH_USER_TOKEN_KEY } from "../../utils/constants";

type State = RouteComponentProps & {
  loading: boolean;
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const LoginContainer: React.FC<State> = ({ history }) => {
  const [loading, toggleLoading] = useState(false);
  const [username, updateUserName] = useState("");
  const [password, updatePassword] = useState("");

  const onFinish = () => {
    toggleLoading(false);
    toggleLoading(true);

    Auth.signIn(username, password)
      .then((user) => {
        const from = {
          pathname: "/dashboard",
        };

        localStorage.setItem(
          AUTH_USER_TOKEN_KEY,
          user.signInUserSession.accessToken.jwtToken
        );

        notification.success({
          message: "Successfully logged in!",
          description: "Logged in successfully, Redirecting you in a few!",
          placement: "topRight",
          duration: 1.5,
        });

        history.push(from);
      })
      .catch((err) => {
        toggleLoading(false);

        notification.error({
          message: "Error",
          description: err.message,
          placement: "topRight",
        });

        console.log(err);
      });
  };

  return (
    <FormWrapper
      className="login-form"
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateUserName(e.currentTarget.value)
          }
          name="username"
          placeholder="Username"
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updatePassword(e.currentTarget.value)
          }
          value={password}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item className="text-center">
        <Row gutter={16}>
          <Col lg={24}>
            <Link
              style={{ float: "right" }}
              className="login-form-forgot"
              to="/forgot-password"
            >
              Forgot password
            </Link>
          </Col>
          <Col lg={24}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              disabled={loading}
              htmlType="submit"
              className="login-form-button"
            >
              {loading ? <LoadingOutlined spin /> : "Login"}
            </Button>
          </Col>
          <Col lg={24}>
            Or <Link to="/signup">sign up now!</Link>
          </Col>
        </Row>
      </Form.Item>
    </FormWrapper>
  );
};

export default LoginContainer;
