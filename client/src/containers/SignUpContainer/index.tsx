import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Form, Input, Row, Col, Button, notification, Popover } from "antd";
import { Link, Redirect } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

/** Presentational */
import FormWrapper from "../../components/styled/FormWrapper";

const SignUpContainer = () => {
  const [loading, toggleLoading] = useState(false);
  const [redirect, toggleRedirect] = useState(false);
  const [username, updateUsername] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const { firstName, lastName, email, phoneNumber, password } = values;

    // hide loader
    toggleLoading(false);

    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name: `${firstName} ${lastName}`,
        phone_number: phoneNumber,
      },
    })
      .then(() => {
        notification.success({
          message: "Successfully signed up user!",
          description:
            "Account created successfully, Redirecting you in a few!",
          placement: "topRight",
          duration: 1.5,
          onClose: () => {
            updateUsername(email);
            toggleRedirect(true);
          },
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: "Error signing up user",
          placement: "topRight",
          duration: 1.5,
        });

        toggleLoading(false);
      });
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

  if (redirect) {
    return <Redirect to={{ pathname: `/verify-code?username=${username}` }} />;
  }

  return (
    <FormWrapper
      className="login-form"
      onFinish={onFinish}
      form={form}
      name="register"
      scrollToFirstError
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not a valid email!",
          },
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input
          name="email"
          type="email"
          placeholder="Email"
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input placeholder="First Name" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input placeholder="Last Name" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input placeholder="Phone Number" prefix={<PhoneOutlined />} />
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
        <Row gutter={16}>
          <Col lg={24}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              disabled={loading}
              htmlType="submit"
              className="signup-form-button"
            >
              {loading ? <LoadingOutlined spin /> : "Sign Up"}
            </Button>
          </Col>
          <Col lg={24}>
            Or <Link to="/login">login now!</Link>
          </Col>
        </Row>
      </Form.Item>
    </FormWrapper>
  );
};

export default SignUpContainer;
