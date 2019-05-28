import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { menus } from '@/redux/routes/menus'
import { changeBreadCrumbData } from '@/redux/actions'
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu
import "./Sidebar.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.role = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role;
    }


    state = {
        collapsed: false
    };

    handleMenuClick = ({ item, key, keyPath }) => {
        this.props.history.push(key);

        console.log(keyPath, '0000000');
        keyPath = keyPath && keyPath.reverse()
        const crumb = {
            keyPath: keyPath,
            openKeys: keyPath.filter((item) => {
                console.log(item, key, 'pppp');
                console.log( !(item === key));
                return !(item === key)
            }),
            selectedKeys: [key]
        }

        this.props.changeBreadCrumbData(crumb);
        console.log(this.state);
    };


     handleFilter =  permission => {
        // 过滤没有权限的页面
        if(!permission ||permission===this.role ) return true
        return false
    };

    render() {
        const { history } = this.props;
        const menuSelected = history.location.pathname;

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" selectedKeys={[this.props.router.location.pathname]} onClick={this.handleMenuClick} defaultSelectedKeys={[menuSelected]}>
                    {
                        menus.map(ele => {
                            if(ele.children){
                                return (
                                    this.handleFilter(ele.permission) &&
                                    <SubMenu key={ele.path} title={<span><Icon type={ele.icon} /><span>{ele.title}</span></span>} >
                                        {
                                            ele.children.map(subItem =>
                                                this.handleFilter(subItem.permission) &&
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
                                    this.handleFilter(ele.permission) && <Menu.Item key={ele.path}>
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

const mapStateToProps = (state) => {
    return {userInfo: state.user, router: state.router, currentCrumb: state.breadCrumb, state: state}
};

export default connect(mapStateToProps, {changeBreadCrumbData})(withRouter(Sidebar));