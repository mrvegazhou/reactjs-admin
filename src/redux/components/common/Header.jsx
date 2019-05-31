import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Avatar, Icon, Dropdown,Badge } from "antd";
const { Header: AntHeader } = Layout;
import Bell from "@/redux/components/HeaderActions/Bell";
import Calendar from "@/redux/components/HeaderActions/Calendar";
import "./Header.css";

import { signOut, clickCalendar } from "@/redux/actions";

class Header extends Component {

    state =  {
        bellData: {
            notifications: [
                {
                    id: 1,
                    title: "Welcome to the Admin",
                    icon: "mail",
                    description: "",
                    tags: [],
                    date: "2019-03-02 13:40"
                }
            ]
        }
    };

    constructor(props) {
        super(props);
        this.resetCalendarCount = this.resetCalendarCount.bind(this)
    }

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

    resetCalendarCount () {
        this.props.clickCalendar(0);
    };

    render() {
        const { user, isSignedIn } = this.props.auth;
        return (
            <AntHeader className="header">
                <Icon className="buttonTrigger" type={this.props.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.props.handleCollapse} />
                <div className="header-right">

                    <Calendar count={this.props.calendar.showCalendarCount} resetCalendarCount={this.resetCalendarCount}></Calendar>

                    <Bell onItemClick={item => {
                        //dispatch here the action
                        console.log(item);
                    }}
                          onClear={() => console.log("On clear")}
                          data={this.state.bellData}
                          onPopupVisibleChange={visible => {
                              // dispath here the action get bells data
                              console.log(visible);
                          }}
                    >
                        <Bell.Tab
                            data={this.state.bellData.notifications}
                            title="提醒"
                            emptyText="您没有消息提示!"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                    </Bell>
                    <Dropdown overlay={this.menu} className="userProfile-dropdown" trigger={["click"]}>
                                <span className="header-action">
                                  <Avatar size="small" shape='circle' src={user!==null ? auth.url : null} icon="user" className="header-avatar-icon" />
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

const mapStateToProps = ({ auth,calendar }) => {
    return {
        auth,
        calendar
    };
};

export default connect(
    mapStateToProps,
    { signOut, clickCalendar }
)(withRouter(Header));