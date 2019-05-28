import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Breadcrumb, Icon } from "antd";
import SideBar from '@/redux/components/common/SideBar';
import Header from '@/redux/components/common/Header';
import { routes } from "@/redux/routes/menus";

import "./layout.css";
import BackToTop from "@/redux/components/backToUp";
import Error404 from "@/redux/components/error/404";
import Home from "@/redux/components/home";
import TableList from "@/redux/views/tables";

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

    constructBreadCrumb = (menus, keyPath, links = []) => {
        keyPath && keyPath.forEach((key, index) => {
            menus = menus.filter((menu) => {
                return menu.path === key
            });
            if (menus.length) {
                links.push(menus[0].value);
                if (menus[0].children) {
                    this.constructBreadCrumb(menus[0].children, keyPath.slice(index + 1), links);
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
        console.log(localStorage.getItem("currentCrumb"), "oooo'");
        let obj = JSON.parse(localStorage.getItem("currentCrumb")) || currentCrumb;
        return (
                <Layout style={{minHeight: "100vh"}}>
                    <SideBar collapsed={this.state.collapsed}/>
                    <Layout>
                        <Header collapsed={this.state.collapsed} handleCollapse={this.handleCollapse}/>
                        <Content className="page-layout-content">
                            <Breadcrumb style={{ margin: '0 0 10px 0', color: '#000000' }} separator=">">
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                {this.constructBreadCrumb(routes, (obj && obj.keyPath))}
                            </Breadcrumb>
                            <Switch>
                                {
                                    routes.map(ele => {
                                            return this.handleFilter(ele.permission) && <Route
                                                component={ele.component}
                                                key={ele.path}
                                                path={ele.path}
                                                exact={ele.exact ? true : false}
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
    console.log(state, 'sdsdfsd');
    return {
        auth: state.auth,
        currentCrumb: state
    };
};

export default connect(mapStateToProps)(LayoutComponent);