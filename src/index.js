import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'

import './styles/style.sass'

const render = Component => {   // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>
        ,document.getElementById('app')
    )
}
render(App)

if (module.hot) {
    module.hot.accept('./App', () => { render(App) })
}