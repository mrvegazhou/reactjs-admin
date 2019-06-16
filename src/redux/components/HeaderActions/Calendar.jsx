import React, {Component} from "react";
import {Badge, Dropdown, Icon} from "antd";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {changeBreadCrumbData, updateAccessMenu, updateTabCurrentPage} from "@/redux/actions/common";

class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    change = ()=> {
        this.props.resetCalendarCount();
    };

    componentDidUpdate() {
        if( this.props.location.pathname=='/layout/calendar' ) {
            this.crumb = {
                keyPath: ["calendars"],
                openKeys: [],
                selectedKeys: ["calendars"]
            }
            this.props.changeBreadCrumbData(this.crumb);
            this.props.updateTabCurrentPage("calendars");
        }
    }

    render() {
        return (
            <span className="header-action" >
                <Link to='/layout/calendar' onClick={this.change}>
                    <Badge count={this.props.count} overflowCount={99}>
                        <Icon type="schedule" style={{fontSize:16, color: '#1DA57A' }}/>
                    </Badge>
                </Link>
            </span>
        );
    }
}

export default connect(null, { changeBreadCrumbData, updateTabCurrentPage })(Calendar);