import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Avatar, Icon, Dropdown } from "antd";
const { Header: AntHeader } = Layout;
import "./Header.css";

import { signOut } from "@/redux/actions";

class Header extends Component {
    state = {
        showInputSearch: false,
        bellData: {
            notifications: [
                {
                    id: 1,
                    title: "Welcome to the Admin",
                    icon: "mail",
                    description: "",
                    tags: [],
                    date: "2019-03-02 13:40"
                },
                {
                    id: 2,
                    title: "A new section was created!",
                    icon: "mail",
                    description: "",
                    tags: [],
                    date: "2019-03-02 10:40"
                },
                {
                    id: 3,
                    title: "You need to create a security code",
                    icon: "mail",
                    description: "",
                    tags: [],
                    date: "2019-03-01 09:10"
                }
            ]
        }
    };

    handleMenuClick = e => {
        switch (e.key) {
            case "logout":
                this.props.signOut();
                break;
            default:
                this.props.history.push(e.key);
                break;
        }
    };

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="userProfile">
                <Icon type="user" />
                Profile
            </Menu.Item>
            <Menu.Item key="userSetting">
                <Icon type="setting" />
                Account Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <Icon type="logout" />
                Logout
            </Menu.Item>
        </Menu>
    );

    render() {
        const { user, isSignedIn } = this.props.auth;
        return (
            <AntHeader className="header">
                <Icon className="buttonTrigger" type={this.props.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.props.handleCollapse} />
                <div className="header-right">
                    <Dropdown overlay={this.menu} className="userProfile-dropdown" trigger={["click"]}>
                        <span className="header-action">
                          <Avatar size="small" src={null} className="header-avatar-icon" />
                          <span className="header-avatar-name">
                            {null}
                          </span>
                        </span>
                    </Dropdown>
                </div>
            </AntHeader>
        )
    };
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(
    mapStateToProps,
    { signOut }
)(withRouter(Header));