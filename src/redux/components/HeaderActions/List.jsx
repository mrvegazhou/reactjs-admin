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
                            <AntList.Item.Meta className="list-meta"
                                avatar={
                                    <Avatar>
                                        <Icon type={item.icon} />
                                    </Avatar>
                                }
                                title={
                                    <div className="list-title">
                                        {item.title}
                                        <div className="list-extra" />
                                        {/* Maybe for tags element */}
                                    </div>
                                }
                                description={
                                    <div>
                                        <div className="list-description" title={item.description}>
                                            {item.description}
                                        </div>
                                        <div className="list-datetime">{item.date}</div>
                                    </div>
                                }
                            />
                        </AntList.Item>
                    );
                })}
            </AntList>
        )
    }
}

export default List;