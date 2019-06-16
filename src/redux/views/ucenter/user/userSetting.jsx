import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import BaseInfoSetting from './baseInfoSetting';
import "./userSetting.less";

const { Item } = Menu;

class UserSetting extends PureComponent {
    constructor(props) {
        super(props);
        const menuMap = {
            base: "基本设置",
            security: "安全设置"
        };
        this.state = {
            selectKey: 'base',
            Component: <BaseInfoSetting />,
            menuMap
        };
    }

    componentDidMount() {
        const { match, location } = this.props;
        console.log(location, "_______")
        const key = location.pathname.replace(`${match.path}/`, '');
        const selectKeyName = menuMap[key] ? key : 'base';
        this.setState({selectKey: selectKeyName});
    }

    getMenu = () => {
        const { menuMap } = this.state;
        return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
    };

    getRightTitle = () => {
        const { selectKey, menuMap } = this.state;
        return menuMap[selectKey];
    };

    selectKey = ({ key }) => {
        let Component;
        switch (key) {
            case 'base':
                Component = <BaseView/>
                break;
            default:
                break;
        }
        this.setState({
            selectKey: key,
            Component
        });
    };

    render() {
        const { selectKey, Component } = this.state;
        console.log('^^^^^');
        return (
            <div className='main'>
                <div className='leftmenu'>
                    <Menu mode='inline' selectedKeys={[selectKey]} onClick={this.selectKey}>
                        {this.getMenu()}
                    </Menu>
                </div>
                <div className='leftmenu'>
                    <div className='title'>{this.getRightTitle()}</div>
                    {Component}
                </div>
            </div>
        )
    }
}

export default withRouter(UserSetting);