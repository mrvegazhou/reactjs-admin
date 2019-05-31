import React, {Component} from "react";
import {Badge, Dropdown, Icon} from "antd";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {clickCalendar} from "@/redux/actions";

class Calendar extends Component {
    state = {
        showCalendarCount: this.props.count
    }
    onChange = (e) => {
        this.setState({
            showCalendarCount: 2
        });
        console.log(this.state,"oooo");
    }

    render() {
        const { showCalendarCount } = this.state;
        const trigger = (
            <span className="header-action">
                <Link to="/layout/calendar">
                    <Badge count={showCalendarCount||0} overflowCount={99} onClick={this.onChange}>
                        <Icon type="schedule" style={{fontSize:16, color: '#1DA57A' }}/>
                    </Badge>
                </Link>
            </span>
        );
        return (
            <Dropdown trigger={["click"]} >
                {trigger}
            </Dropdown>
        );
    }
}

const mapStateToProps = ({ calendar }) => {
    return {
        calendar
    };
};

export default connect(
    mapStateToProps,
    { clickCalendar }
)(Calendar);

// export default Calendar;