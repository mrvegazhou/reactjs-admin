import "./List.css";
import React, { Component } from "react";
import { List as AntList, Avatar, Icon } from "antd";

class List extends Component {
    render() {
        const { data = [], onClick, emptyImage, emptyText } = this.props;
        if (data.length === 0) {
            return (
                <div className="notData">
                    {emptyImage ? <img src={emptyImage} alt={emptyText} /> : null}
                    <div>{emptyText}</div>
                </div>
            );
        }
        return (
            <AntList className="list">
                {data.map(item => {
                    return (
                        <AntList.Item className="list-item" key={item.id} onClick={() => onClick(item)}>
                            
                        </AntList.Item>
                    );
                })}
            </AntList>
        )
    }
}

export default List;