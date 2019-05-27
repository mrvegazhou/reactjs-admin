import "./Login.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography } from "antd";
import { signIn } from "@/redux/actions";
const { Title } = Typography;

import LoginForm from "@/redux/components/forms/Login";


class Login extends Component {
    componentWillReceiveProps({ auth }) {
        if (auth.redirectTo) {
            history.push(auth.redirectTo);
        }
    }

    onSubmit = ({ email, password }) => {
        this.props.signIn(email, password);
    };

    render() {
        const { isLoading } = this.props.auth;

        return (
            <div className="container-center">
                <div className="title-signin" style={{ textAlign: "center" }}>
                    <Title level={3} style={{ fontWeight: "lighter" }}>
                        Login in to the admin
                    </Title>
                </div>
                <LoginForm onSubmit={this.onSubmit} isLoading={isLoading} />
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(
    mapStateToProps,
    { signIn }
)(Login);