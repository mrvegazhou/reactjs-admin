import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Breadcrumb, Icon } from "antd";
import SideBar from '@/redux/components/common/SideBar';
import Header from '@/redux/components/common/Header';
import { menus, routes } from "@/redux/routes/menus";

import "./layout.css";
import BackToTop from "@/redux/components/backToUp";
import Error404 from "@/redux/components/error/404";
import AuthRouter from "@/redux/routes/privateRoute";

const { Content, Footer } = Layout;


class LayoutComponent extends Component {

    constructor(props) {
        super(props);
        this.role = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role;
    }

    state = {
        collapsed: false
    };

    handleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    handleFilter = permission =>{
        // 过滤没有权限的页面
        if(!permission ||permission===role ) return true
        return false

    }

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
        const { currentCrumb } = this.props;
        return (
                <Layout style={{minHeight: "100vh"}}>
                    <SideBar collapsed={this.state.collapsed}/>
                    <Layout>
                        <Header collapsed={this.state.collapsed} handleCollapse={this.handleCollapse}/>
                        <Content className="page-layout-content">
                            <Breadcrumb style={{ margin: '0 0 10px 0', color: '#000000' }} separator=">">
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                {this.constructBreadCrumb(routes, (currentCrumb && currentCrumb.keyPath))}
                            </Breadcrumb>
                            <Switch>
                                {
                                    routes.map(ele => {
                                            return this.handleFilter(ele.permission) && ele.component!=null && <AuthRouter
                                                component={ele.component}
                                                key={ele.path}
                                                path={ele.path}
                                            />
                                    })
                                }
                                <Route component={Error404}></Route>
                            </Switch>
                        </Content>
                        <BackToTop/>
                        <Footer style={{textAlign: "center"}}>
                            Copy. Project in progress
                        </Footer>
                    </Layout>
                </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        currentCrumb: state.breadCrumb.currentCrumb,

    };
};

export default connect(mapStateToProps)(LayoutComponent);