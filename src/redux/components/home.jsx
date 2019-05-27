import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
    render() {

        return (
            <div style={{height:2000}}>Welcome !

            </div>

        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps)(Home);