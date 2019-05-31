import React, {Component} from "react";
import {Badge, Dropdown, Icon} from "antd";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {clickCalendar} from "@/redux/actions";

class Calendar extends Component {
    constructor(props) {
        super(props);
        // this.props.resetCalendarCount();
    }

    change = ()=> {
        this.props.resetCalendarCount();
    };

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

export default Calendar;