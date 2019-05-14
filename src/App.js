import React, { Component } from 'react'
import {Provider} from 'react-redux'
import router from "./router";

class App extends Component {
    componentWillMount(){

    }
    render() {
        return (
            <Provider store={store}>
                {router}
            </Provider>
        )
    }
}

export default App