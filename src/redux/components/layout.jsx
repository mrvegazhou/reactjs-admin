import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Breadcrumb, Icon, Tabs, Menu, Dropdown } from "antd";
import SideBar from '@/redux/components/common/SideBar';
import Header from '@/redux/components/common/Header';
import { menus, routes } from "@/redux/routes/menus";

import "./layout.css";
import BackToTop from "@/redux/components/backToUp";
import Error404 from "@/redux/components/error/404";
import AuthRouter from "@/redux/routes/privateRoute";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

class LayoutComponent extends Component {

    constructor(props) {
        super(props);
        this.role = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role;
        const routeKey = '/layout/home'
        const tabName = '首页';
        const tabLists = this.updateTree(routes);
        let tabList=[]
        tabLists.map((v) => {
            if(v.key === routeKey){
                if(tabList.length === 0){
                    v.closable = false
                    v.tab = tabName
                    tabList.push(v);
                }
            }
        });
        this.state = {
            collapsed: false,
            activeKey:routeKey,
            tabListKey:[routeKey],
            tabList:tabList,
            routeKey
        };
    }

    updateTree = data => {
        const treeData = data;
        const treeList = [];
        // 递归获取树列表
        const getTreeList = data => {
            data.forEach(node => {
                if(!node.level){
                    treeList.push({ tab: node.title, key: node.path, closable:true });
                }
                if (node.children && node.children.length > 0) {
                    getTreeList(node.children);
                }
            });
        };
        getTreeList(treeData);
        return treeList;
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

    // 切换 tab页 router.push(key);
    onChange = key => {
        this.setState({ activeKey: key });
        this.props.history.push(key)
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    render() {
        const currentCrumb =  JSON.parse(localStorage.getItem("currentCrumb")) || this.props.currentCrumb;

        //tabs操作按钮
        const menu = (
            <Menu onClick={this.onClickHover}>
                <Menu.Item key="1">关闭当前</Menu.Item>
                <Menu.Item key="2">关闭其他</Menu.Item>
                <Menu.Item key="3">关闭全部</Menu.Item>
            </Menu>
        );
        const operations = (
            <Dropdown overlay={menu} >
                <a className="ant-dropdown-link" href="#">
                    <Icon type="down" />
                </a>
            </Dropdown>
        );
        const pathname = this.props.location.pathname;
        let {activeKey, routeKey} = this.state;
        if(pathname === '/'){
            // router.push(routeKey)
            activeKey = routeKey
        }

        return (
                <Layout style={{minHeight: "100vh"}}>
                    <SideBar collapsed={this.state.collapsed}/>
                    <Layout>
                        <Header collapsed={this.state.collapsed} handleCollapse={this.handleCollapse} />
                        <Content className="page-layout-content">
                            <Breadcrumb style={{ margin: '0 0 10px 0', color: '#000000' }} separator=">">
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                {this.constructBreadCrumb(routes, (currentCrumb && currentCrumb.keyPath))}
                            </Breadcrumb>
                            <Switch>
                                {routes.map(ele => {
                                    return this.handleFilter(ele.permission) && ele.component!=null && <AuthRouter
                                        component={ele.component}
                                        key={ele.path}
                                        path={ele.path}
                                    />
                                })}
                                <Route component={Error404}></Route>
                            </Switch>
                        </Content>
                        {/*<Tabs*/}
                        {/*    activeKey={activeKey}*/}
                        {/*    onChange={this.onChange}*/}
                        {/*    tabBarExtraContent={operations}*/}
                        {/*    tabBarStyle={{background:'#fff', borderTop:0}}*/}
                        {/*    tabPosition="top"*/}
                        {/*    tabBarGutter={-1}*/}
                        {/*    hideAdd*/}
                        {/*    type="editable-card"*/}
                        {/*    onEdit={this.onEdit}*/}
                        {/*    style={{height: 70}}*/}
                        {/*>*/}
                        {/*        { this.state.tabList.map(item => (*/}
                        {/*        <TabPane tab={item.tab} key={item.key} closable={item.closable} >*/}
                        {/*            */}
                        {/*        </TabPane>*/}
                        {/*        ))}*/}
                        {/*</Tabs>*/}
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