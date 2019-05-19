import React from 'react'
import { Menu, Icon } from 'antd'
import { menus } from '@/router/menus'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


const MenuComponent = props => {
    const { history } = props
    const menuSelected = history.location.pathname
    const menuOpened = `/${menuSelected.split('/')[1]}`
    return (
        <Menu
            defaultOpenKeys={[menuOpened]}
            defaultSelectedKeys={[menuSelected]}
            inlineCollapsed={props.collapsed}
            mode="inline"
            style={{
                borderRight: 'none'
            }}
        >
            {
                menus.map(ele => {
                    if(ele.children){
                        return (
                            <SubMenu key={ele.path} title={<span><Icon type={ele.icon} /><span>{ele.title}</span></span>}>
                                {ele.children.map(subItem =>
                                     <Menu.Item key={subItem.path}>
                                        <Link to={subItem.path}>
                                            {subItem.title}
                                        </Link>
                                     </Menu.Item>
                                )}
                            </SubMenu>
                        )

                    } else {
                        return (
                            <Menu.Item key={ele.path}>
                                <Link to={ele.path}>
                                    <Icon type={ele.icon} />
                                    <span>{ele.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                    }
                })
            }
        </Menu>
    )
}
const mapStateToProps = state => ({userInfo: state.user.userInfo,taglist: state.UI.taglist})
const mapDispatchToProps = dispatch => ({
})
export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(MenuComponent))