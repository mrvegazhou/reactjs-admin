import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { routes } from '@/redux/routes/menus';
import MenuMapToComponent from '@/redux/routes/menuMapToComponent';

const TabPane = Tabs.TabPane;

class NavTabs extends React.PureComponent {
    state = {
        currentPage: '',
        openPages: [{
            name: "home",
            title: "首页",
            path: "/layout/home",
            closable: false,
            content: MenuMapToComponent["home"]
        }]
    }

    hasPermission = true

    componentWillReceiveProps(nextProps,nextState) {
        if (!nextProps.show||nextProps.openAccessMenu.length===0) {
            return;
        }
        const pathname = nextProps.location.pathname;
        let name = routes.find(key => {
            return key['path'] === pathname;

        });
        if (name) {
            if (this.state.openPages.some(s => s.path === name.path)) {
                if (this.state.currentPage !== name.value) {
                    this.setState({
                        currentPage: name.value
                    });
                }
            } else {
                const { openAccessMenu } = nextProps;
                const menus = openAccessMenu.filter(s => s.path === name.path);
                if (menus.length > 0) {
                    let menu = menus[0];
                    let openPages = this.state.openPages;
                    openPages.push({
                        name: menu.value,
                        title: menu.title,
                        path: menu.path,
                        closable: true
                    });
                    this.setState({
                        openPages: openPages,
                        currentPage: name.value
                    });
                } else {
                    //403
                    if (this.state.openPages.some(s => s.value === 'page403')) {
                        if (this.state.currentPage !== 'page403') {
                            this.setState({
                                currentPage: 'page403'
                            });
                        }
                    } else {
                        let openPages = this.state.openPages;
                        openPages.push({
                            name: 'page403',
                            title: '没有权限',
                            path: pathname,
                            closable: true
                        });
                        this.setState({
                            openPages: openPages,
                            currentPage: 'page403'
                        });
                    }
                }
            }
        } else if (nextProps.location.pathname === "/layout/home" && nextState.currentPage !== 'home') {
            this.setState({
                currentPage: "home"
            })
        } else {
            //404
            if (this.state.openPages.some(s => s.value === '404')) {
                if (this.state.currentPage !== '404') {
                    this.setState({
                        currentPage: '404'
                    });
                }
            } else {
                let openPages = this.state.openPages;
                openPages.push({
                    name: '404',
                    title: '页面不存在',
                    path: pathname,
                    closable: true
                });
                this.setState({
                    openPages: openPages,
                    currentPage: '404'
                });
            }
        }
    }

    onTabClick = (activeKey) => {
        if (activeKey !== this.state.currentPage) {
            if ( activeKey === 'home' ) {
                this.props.history.push('/layout/home');
                return;
            } else {
                let menuPath = routes.filter(ele => ele.value==activeKey);
                this.props.history.push(menuPath);
            }
        }

    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    render() {
        console.log(this.state.currentPage, "#####");
        return (
            <div style={this.props.style}>
                <Tabs
                    hideAdd
                    activeKey={this.state.currentPage}
                    tabBarStyle={{ background: 'white', width: '100%', padding: 0, margin: 0, border: 'none' }}
                    type="editable-card"
                    onEdit={this.onEdit}
                    onTabClick={this.onTabClick}
                >
                    {
                        this.state.openPages.map(page => {
                            let Page = MenuMapToComponent[page.name] ? MenuMapToComponent[page.name] : MenuMapToComponent["error404"];
                            return  <TabPane forceRender tab={page.title} closable={true} key={page.name}>
                                        <Page />
                                    </TabPane>
                        })
                    }
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        openAccessMenu: state.accessMenu.openAccessMenu
    }
}

export default withRouter(connect(mapStateToProps)(NavTabs));