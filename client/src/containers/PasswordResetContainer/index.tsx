import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Form, Input, Button, notification, Popover, Row, Col } from "antd";
import { LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { Auth } from "aws-amplify";

/** Presentational */
import FormWrapper from "../../components/styled/FormWrapper";

const PasswordResetContainer = (props: RouteComponentProps) => {
  const [loading, toggleLoading] = useState(false);
  const [redirect, toggleRedirect] = useState(false);

  const onFinish = (values: any) => {
    const { code, password } = values;
    let username = props.location.search.split("=")[1];

    Auth.forgotPasswordSubmit(username.trim(), code.trim(), password.trim())
      .then(() => {
        notification.success({
          message: "Success!",
          description: "Password reset successful, Redirecting you in a few!",
          placement: "topRight",
          duration: 1.5,
          onClose: () => {
            toggleRedirect(true);
          },
        });
      })
      .catch((err) => {
        notification["error"]({
          message: "Error resetting password",
          description: err.message,
          placement: "topRight",
          duration: 1.5,
        });

        toggleLoading(false);
      });

    // show loader
    toggleLoading(true);
  };

  const title = "Password Policy";
  const passwordPolicyContent = (
    <React.Fragment>
      <h4>Your password should contain: </h4>
      <ul>
        <li>Minimum length of 8 characters</li>
        <li>Numerical characters (0-9)</li>
        <li>Special characters</li>
        <li>Uppercase letter</li>
        <li>Lowercase letter</li>
      </ul>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <FormWrapper onFinish={onFinish}>
        <div className="text-center">
          <p>Check your email for the confirmation code</p>
        </div>
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: "Please input your confirmation code!",
            },
          ]}
        >
          <Row>
            <Col lg={24}>
              <Input
                prefix={<LockOutlined />}
                placeholder="Enter your verification code"
              />
            </Col>
          </Row>
        </Form.Item>

        <Popover
          placement="right"
          title={title}
          content={passwordPolicyContent}
          trigger="focus"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              name="password"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
        </Popover>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Row>
            <Col lg={24}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="password-reset-form-button"
              >
                {loading ? <LoadingOutlined spin /> : "Reset Password"}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
      {redirect && <Redirect to={{ pathname: "/login" }} />}
    </React.Fragment>
  );
};

export default PasswordResetContainer;
