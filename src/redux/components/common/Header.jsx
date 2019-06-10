import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {Layout, Menu, Avatar, Icon, Dropdown, Badge, Breadcrumb} from "antd";
const { Header: AntHeader } = Layout;
import { changeBreadCrumbData } from '@/redux/actions'
import Bell from "@/redux/components/HeaderActions/Bell";
import Calendar from "@/redux/components/HeaderActions/Calendar";
import {calendarMenuUrl, menus, routes} from "@/redux/routes/menus";

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
        this.props.changeBreadCrumbData(
            {
                keyPath: [calendarMenuUrl],
                openKeys: [calendarMenuUrl],
                selectedKeys: [calendarMenuUrl]
            }
        );
    };

    //面包屑
    constructBreadCrumb = (menus, keyPath, links = []) => {
        keyPath && keyPath.forEach((key, index) => {
            let menusTmp = menus.filter((menu) => {
                return menu.path === key
            });

            if (menusTmp.length) {
                links.push(menusTmp[0].value);
                if (menusTmp[0].children) {
                    this.constructBreadCrumb(menusTmp[0].children, keyPath.slice(index + 1), links);
                }
            }

        })

        if (links.length) {
            return links.map((link, index) => {
                return (<Breadcrumb.Item key={index}> {link} </Breadcrumb.Item>)
            })
        }
    }

    render() {
        const currentCrumb =  JSON.parse(localStorage.getItem("currentCrumb")) || this.props.currentCrumb;
        const { user, isSignedIn } = this.props.auth;
        return (
            <AntHeader className="header">
                <div className="header-left">
                    <Icon className="buttonTrigger" type={this.props.collapsed ? "menu-unfold" : "menu-fold"} onClick={this.props.handleCollapse}  style={{ height: '50px', lineHeight: '50px' }} />
                </div>
                <div className="header-left">
                    <Breadcrumb style={{ color: '#000000',height: '50px', lineHeight: '50px' }} separator=">">
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        {this.constructBreadCrumb(routes, (currentCrumb && currentCrumb.keyPath))}
                    </Breadcrumb>
                </div>
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

const mapStateToProps = ({ auth,calendar,breadCrumb }) => {
    return {
        auth,
        calendar,
        currentCrumb: breadCrumb.currentCrumb,
    };
};

export default connect(
    mapStateToProps,
    { signOut, clickCalendar, changeBreadCrumbData }
)(withRouter(Header));