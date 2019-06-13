import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { routes } from '@/redux/routes/menus';
import MenuMapToComponent from '@/redux/routes/menuMapToComponent';
import {updateTabOpenPages, updateTabCurrentPage} from '@/redux/actions/common';

const TabPane = Tabs.TabPane;

class NavTabs extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: ''
        };
    }

    hasPermission = true

    componentWillReceiveProps(nextProps, nextState) {
        if (!nextProps.show||nextProps.openAccessMenu.length===0) {
            return;
        }
        const pathname = nextProps.location.pathname;
        let name = routes.find(key => {
            return key['path'] === pathname;
        });

        if (name) {
            if (this.props.openPages.some(s => s.path === name.path)) {
                if (this.props.currentPage !== name.value) {
                    this.props.updateTabCurrentPage('page403');
                }
            } else {
                const { openAccessMenu } = nextProps;
                const menus = openAccessMenu.filter(s => s.path === name.path);

                if (menus.length > 0) {
                    let menu = menus[0];
                    let openPages = this.props.openPages;
                    openPages.push({
                        name: menu.value,
                        title: menu.title,
                        path: menu.path,
                        closable: true
                    });
                    this.props.updateTabOpenPages(openPages);
                    this.props.updateTabCurrentPage(name.value);
                } else {
                    //403
                    if (this.props.openPages.some(s => s.value === 'page403')) {
                        if (this.props.currentPage !== 'page403') {
                            this.props.updateTabCurrentPage("page403");
                        }
                    } else {
                        let openPages = this.props.openPages;
                        openPages.push({
                            name: 'page403',
                            title: '没有权限',
                            path: pathname,
                            closable: true
                        });
                        this.props.updateTabOpenPages(openPages);
                        this.props.updateTabCurrentPage("page403");
                    }
                }
            }
        } else if (nextProps.location.pathname === "/layout/home" && nextProps.currentPage !== 'home') {
            this.props.updateTabCurrentPage("home");
        } else {
            //404
            if (this.props.openPages.some(s => s.name === '404')) {
                if (this.props.currentPage !== '404') {
                    this.props.updateTabCurrentPage("404");
                }
            } else {
                let openPages = this.props.openPages;
                openPages.push({
                    name: '404',
                    title: '页面不存在',
                    path: pathname,
                    closable: true
                });
                this.props.updateTabOpenPages(openPages);
                this.props.updateTabCurrentPage("404");
            }
        }

        this.setState({
            currentPage: this.props.currentPage
        });
    }

    onTabClick = (activeKey) => {
        if (activeKey !== this.props.currentPage) {
            this.props.updateTabCurrentPage(activeKey);
        }
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = targetKey => {
        let activeKey = this.props.currentPage;
        let lastIndex;
        this.props.openPages.forEach((pane, i) => {
            if (pane.name === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.props.openPages.filter(pane => pane.name !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].name;
        }
        this.props.updateTabOpenPages(panes);
        this.props.updateTabCurrentPage(activeKey);
    };


    render() {
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
                        this.props.openPages.map(page => {
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

export default withRouter(connect(mapStateToProps, { updateTabOpenPages, updateTabCurrentPage })(NavTabs));