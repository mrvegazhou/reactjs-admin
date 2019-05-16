import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { changeIsMobile, changeCollapsed } from '@/redux/actions/layout'
import user from "@/redux/reducers/userReducer";

class LayoutComponent extends Component {
    componentWillMount () {

    }

    getClientWidth = () => {
        const clientWidth = document.body.clientWidth;
        const { changeCollapsed,changeIsMobile } = this.props;
        changeIsMobile(clientWidth <= 992);
        changeCollapsed(clientWidth <= 992);
        console.log(`当前屏幕宽度：${clientWidth}`);
    }

    render () {
        const {collapsed,isMobile} = this.props;
        let marginLeft = collapsed ? 80 : 250;
        isMobile && (marginLeft=0);
        return (
            <Layout>

                <Layout style={{ marginLeft,transition:'margin .2s'}}>

                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => (
    {
        collapsed: state.user.collapsed,
        isMobile: state.user.isMobile
    }
)

const mapDispatchToProps = dispatch => ({
    changeCollapsed: playload => {
        dispatch(changeCollapsed(playload))
    },
    changeIsMobile:playload => {
        dispatch(changeIsMobile(playload))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent)
