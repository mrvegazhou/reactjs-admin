import React, { Component } from 'react'
import {Provider} from 'react-redux'
import { hot } from "react-hot-loader";
import router from "./router";
import { store, history } from "./redux/stores/store";

class App extends Component {
    componentWillMount(){

    }
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                {router}
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default hot(module)(App)