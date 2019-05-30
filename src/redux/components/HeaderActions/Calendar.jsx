import React, {Component} from "react";
import {Badge, Dropdown, Icon} from "antd";
import { Link } from "react-router-dom";

class Calendar extends React.PureComponent {

    render() {
        const trigger = (
            <span className="header-action">
               <Link to="/layout/calendar">
                    <Badge count={3} overflowCount={99} >
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

export default Calendar;