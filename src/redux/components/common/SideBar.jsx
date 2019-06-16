import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { menus, routes } from '@/redux/routes/menus'
import { changeBreadCrumbData } from '@/redux/actions'
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu
import "./Sidebar.css";
import { updateAccessMenu, updateTabCurrentPage } from "@/redux/actions/common";
import common from '@/utils/common';

class Sidebar extends PureComponent {
    constructor(props) {
        super(props);
        this.role = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role;
        this.state = {
            openKeys: []
        };
    }

    handleMenuClick = ({ item, key, keyPath }) => {
        keyPath = keyPath && keyPath.reverse();
        const crumb = {
            keyPath: keyPath,
            openKeys: keyPath.filter((item) => {
                return !(item === key)
            }),
            selectedKeys: [key]
        };
        this.props.changeBreadCrumbData(crumb);
        this.props.updateTabCurrentPage(key);
    };

    handleFilter =  permission => {
        // 过滤没有权限的页面
        if(!permission ||permission===this.role ) return true
        return false
    };

    render() {
        const { history } = this.props;
        const menuSelected = history.location.pathname;
        //通过路由获取菜单的name
        const menuSelectedName = routes.filter(item => {
            if (item['path']==menuSelected) {
                return item;
            }
        })[0]['value'];
        const openKey = this.props.breadCrumb.currentCrumb!=null ? [this.props.breadCrumb.currentCrumb.openKeys[this.props.breadCrumb.currentCrumb.openKeys.length-1]] : [menuSelectedName];
        const selectedkey = this.props.breadCrumb.currentCrumb!=null ? this.props.breadCrumb.currentCrumb.selectedKeys : [menuSelectedName];
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu theme="dark"
                      mode="inline"
                      selectedKeys={selectedkey}
                      onClick={this.handleMenuClick}
                      defaultOpenKeys={openKey}
                >
                    {
                        menus.map(ele => {
                            if(ele.children){
                                return (
                                    this.handleFilter(ele.permission) &&
                                    <SubMenu key={ele.value} title={<span><Icon type={ele.icon} /><span>{ele.title}</span></span>} >
                                        {
                                            ele.children.map(subItem =>{
                                                return this.handleFilter(subItem.permission) &&
                                                    <Menu.Item key={subItem.value} >
                                                        <Link to={subItem.path}>
                                                            <Icon type={subItem.icon} />
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </Menu.Item>
                                            })
                                        }
                                    </SubMenu>
                                );
                            } else {
                                return (
                                    this.handleFilter(ele.permission) &&
                                    <Menu.Item key={ele.value}>
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

function mapStateToProps(state) {
    return {
            userInfo: state.auth,
            router: state.router,
            breadCrumb: state.breadCrumb,
            menuCollapse: state.menuCollapse.menuCollapse,
            openAccessMenu: state.accessMenu.openAccessMenu
    }
};

export default connect(mapStateToProps, { changeBreadCrumbData, updateTabCurrentPage })(withRouter(Sidebar));