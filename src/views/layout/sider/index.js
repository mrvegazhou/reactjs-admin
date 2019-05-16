import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout,Icon } from 'antd'
const { Sider } = Layout

class SiderComponent extends Component {
    render () {
        const { collapsed, isMobile } = this.props;
        return (
            <Sider
                collapsed={isMobile?false:collapsed}
                collapsible

            >

            </Sider>
        )
    }
}

const mapStateToProps = state => ({collapsed: state.user.collapsed, isMobile: state.user.isMobile})
export default connect(mapStateToProps)(SiderComponent)