import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Button, Icon, Form } from "antd";

import "./Login.css";

class LoginForm extends Component {
    getErrorMessage({ error, touched }) {
        if (touched && error) {
            return error;
        }
    }

    renderText = ({ input, meta, placeholder, icon, autoComplete = "off" }) => {
        const errorMessage = this.getErrorMessage(meta);
        return (
            <Form.Item
                validateStatus={errorMessage ? "error" : "validating"}
                help={errorMessage}
            >
                <Input
                    prefix={<Icon type={icon} />}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...input}
                />
            </Form.Item>
        );
    };

    renderPassword = ({
                          input,
                          meta,
                          placeholder,
                          icon,
                          autoComplete = "off"
                      }) => {
        const errorMessage = this.getErrorMessage(meta);

        return (
            <Form.Item
                validateStatus={errorMessage ? "error" : "validating"}
                help={errorMessage}
            >
                <Input.Password
                    prefix={<Icon type={icon} />}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...input}
                />
            </Form.Item>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="form-login"
            >
                <Field
                    name="email"
                    placeholder="E-mail or username"
                    icon="user"
                    component={this.renderText}
                />
                <Field
                    name="password"
                    placeholder="Password"
                    icon="lock"
                    component={this.renderPassword}
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.props.isLoading ? "disabled" : ""}
                >
                    Log in
                </Button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.email) {
        errors.email = "Please enter a valid e-mail";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!formValues.password) {
        errors.password = "Please enter a password";
    }

    return errors;
};

export default reduxForm({ form: "loginForm", validate })(LoginForm);
