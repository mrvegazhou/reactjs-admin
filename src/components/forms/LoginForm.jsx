
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Input, Button, Icon, Form } from "antd";

class LoginForm extends Component {
    getErrorMessage({ error, touched }) {
        if (touched && error) {
            return error;
        }
    }


}