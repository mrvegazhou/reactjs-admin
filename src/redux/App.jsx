import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router-dom";
import SideBar from '@/redux/components/common/SideBar';
import Header from '@/redux/components/common/Header';
import GuestRoute from "./routes/GuestRoute";
const { Content, Footer } = Layout;
import { history } from "./store";
import "./App.css";

class App extends Component {
    state = {
        collapsed: false
    };

    handleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        const isSignedIn = true;
        return (
            <ConnectedRouter history={history}>
                <Layout style={{ minHeight: "100vh" }}>
                    <SideBar collapsed={this.state.collapsed} />
                    <Layout>
                        <Header collapsed={this.state.collapsed} handleCollapse={this.handleCollapse} />
                        <Content className="page-layout-content">
                            <Switch>
                                <GuestRoute
                                    path="/login"
                                    component={null}
                                    authenticate={isSignedIn}
                                />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            Copy. Project in progress
                        </Footer>
                    </Layout>
                </Layout>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(App);