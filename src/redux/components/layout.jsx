import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout, Breadcrumb, Icon, Tabs, Menu, Dropdown } from "antd";
import SideBar from '@/redux/components/common/SideBar';
import Header from '@/redux/components/common/Header';
import { menus, routes } from "@/redux/routes/menus";
import NavTabs from "@/redux/components/tabs/navTabs";
import "./layout.css";
import BackToTop from "@/redux/components/backToUp";
import {getJWT} from "@/utils/jwt";
import common from "@/utils/common";
import { updateAccessMenu, changeMenuCollapsed } from "@/redux/actions/common";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

class LayoutComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.role = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role;
        this.state = {
            navTabTop: 0,
            responsive: false,
            navTabShow: true
        };
    }

    componentDidMount() {
        this.initAppData()
        // this.getClientWidth();//判断屏幕尺寸再触发一次render(不需要可去掉)
        // window.onresize = () => {
        //     this.getClientWidth();
        // }

    }

    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const clientWidth = document.body.clientWidth;
        this.setState({
            responsive: clientWidth <= 992,
            menuCollapsed: clientWidth <= 992
        });
        if (clientWidth < 576) {
            this.setState({
                navTabTop: 193
            });
            return;
        }
        if (clientWidth < 768) {
            this.setState({
                navTabTop: 129
            });
            return;
        }
        if (clientWidth >= 768) {
            this.setState({
                navTabTop: 65
            });
            return;
        }
    }

    initAppData = async () => {
        // let token = getJWT();
        // if (!token) {
        //     this.props.history.push('/login');
        //     return;
        // }
        let openAccesseMenu = common.openAccesseMenu(menus);
        this.props.updateAccessMenu({
            openAccessMenu: openAccesseMenu,
        });
    }

    handleCollapse = () => {
        console.log(this.props, !this.props.menuCollapsed);
        this.props.changeMenuCollapsed(!this.props.menuCollapsed);
    };

    handleFilter = permission =>{
        // 过滤没有权限的页面
        if(!permission ||permission===role ) return true
        return false

    }

    render() {

        return (
                <Layout style={{minHeight: "100vh"}}>
                    <SideBar collapsed={this.props.menuCollapsed}/>
                    <Layout>
                        <Header collapsed={this.state.menuCollapsed} handleCollapse={this.handleCollapse} />
                        <Content className="page-layout-content">
                            <NavTabs style={{ marginTop: this.state.navTabTop, width: '100%', display: this.state.navTabShow ? 'block' : 'none' }}
                                     show={true}
                                     openPages={this.props.openPages}
                                     currentPage={this.props.currentPage}
                            />
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
        menuCollapsed: state.menuCollapse.menuCollapsed,
        openPages: state.tabOpenPages.openPages,
        currentPage: state.tabOpenPages.currentPage
    };
};

export default connect(mapStateToProps, {changeMenuCollapsed, updateAccessMenu})(LayoutComponent);