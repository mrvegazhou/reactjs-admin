import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { menus } from '@/redux/routes/menus'
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu
import "./Sidebar.css";

class Sidebar extends Component {
    state = {
        collapsed: false
    };

    handleMenuClick = e => {
        this.setState({ currentPage: e.key });
        this.props.history.push(e.key);
    };

    render() {
        const { history } = this.props;
        const menuSelected = history.location.pathname;
        const roles= localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).roles;

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" selectedKeys={[this.props.router.location.pathname]} onClick={this.handleMenuClick}
                      defaultSelectedKeys={[menuSelected]}
                >
                    {
                        menus.map(ele => {
                            if(ele.children){
                                return (
                                    <SubMenu key={ele.path} title={<span><Icon type={ele.icon} /><span>{ele.title}</span></span>} >
                                        {
                                            ele.children.map(subItem =>
                                                <Menu.Item key={subItem.path}>
                                                    <Link to={subItem.path}>
                                                        {subItem.title}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        }
                                    </SubMenu>
                                );
                            } else {
                                return (
                                    <Menu.Item key={ele.path}>
                                        <Link to={ele.path}>
                                            <Icon type={ele.icon} />
                                            <span>{ele.title}</span>
                                        </Link>
                                    </Menu.Item>
                                );
                            }
                        })
                    }
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = ({user, router}) => { return {userInfo: user, router: router} };

export default connect(mapStateToProps)(withRouter(Sidebar));