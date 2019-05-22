import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography } from "antd";

const { Title } = Typography;

class Login extends Component {
    componentWillReceiveProps({ auth }) {
        if (auth.redirectTo) {
            history.push(auth.redirectTo);
        }
    }

}