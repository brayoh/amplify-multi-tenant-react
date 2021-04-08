import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";

/** Presentational */
import FormWrapper from "../../components/styled/FormWrapper";

const ForgotPasswordContainer = () => {
  const [loading, toggleLoading] = useState(false);
  const [username, updateUsername] = useState("");
  const [redirect, toggleRedirect] = useState(false);

  const onFinish = (values: any) => {
    const { username } = values;

    /** show loader */
    toggleLoading(true);

    Auth.forgotPassword(username)
      .then((data) => {
        notification.success({
          message: "Redirecting you in a few!",
          description: "Account confirmed successfully!",
          placement: "topRight",
          duration: 1.5,
          onClose: () => {
            toggleLoading(false);
            updateUsername(username);
            toggleRedirect(true);
          },
        });
      })
      .catch((err) => {
        toggleLoading(false);

        /** show user error */
        notification.error({
          message: "User confirmation failed",
          description: err.message,
          placement: "topRight",
          duration: 1.5,
        });
      });
  };

  return (
    <React.Fragment>
      <FormWrapper className="forgot-password-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item className="text-center">
          <Row>
            <Col lg={24}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {loading ? <LoadingOutlined spin /> : "Confirm username"}
              </Button>
            </Col>
            <Col lg={24}>
              <Link to="/login">Ooh! Wait! I've remembered!</Link>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
      {redirect && (
        <Redirect
          to={{
            pathname: "/reset-password",
            search: `?username=${username}`,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ForgotPasswordContainer;
