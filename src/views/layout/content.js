import React from 'react'
import { Layout } from 'antd'
import { Redirect, withRouter, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { routes } from '@/router/content'
import { connect } from 'react-redux'
const { Content } = Layout

const Main = ({ location }) => {

    const roles = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).roles


    return (
        <TransitionGroup>
            <CSSTransition
                classNames="fade"
                key={location.pathname}
                timeout={500}
            >
                <Content style={{ margin: '24px 16px'}}>
                    
                </Content>
            </CSSTransition>
        </TransitionGroup>
    )
}

const mapStateToProps = state => ({userInfo: state.user.userInfo})
export default withRouter(connect(mapStateToProps)(Main))