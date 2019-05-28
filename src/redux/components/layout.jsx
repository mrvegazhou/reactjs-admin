import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from "antd";
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

    render() {
        return (
                <Layout style={{minHeight: "100vh"}}>
                    <SideBar collapsed={this.state.collapsed}/>
                    <Layout>
                        <Header collapsed={this.state.collapsed} handleCollapse={this.handleCollapse}/>
                        <Content className="page-layout-content">
                            <Switch>
                                <Route component={Home} key="/home" path="/home" />
                                <Route component={TableList} key="/list" path="/list" />
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

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(LayoutComponent);