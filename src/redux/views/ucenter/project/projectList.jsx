import React, { PureComponent } from 'react';
import { List, Card } from 'antd';
import moment from 'moment';
import './projectList.less';
import AvatarList from '@/redux/components/project/item';

const list = [
    {
        activeUser: 194992,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        content: "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
        cover: "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
        createdAt: "2019-06-16T08:41:41.915Z",
        description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
        href: "https://ant.design",
        id: "fake-list-0",
        like: 175,
        logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
        members: [
            {avatar: "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", name: "曲丽丽", id: "member1"},
            {avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", name: "王昭君", id: "member2"},
            {avatar: "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", name: "董娜娜", id: "member3"}
        ],
        message: 16,
        newUser: 1590,
        owner: "付小小",
        percent: 90,
        star: 124,
        status: "active",
        subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
        title: "Alipay",
        updatedAt: "2019-06-16T08:41:41.915Z",
    }
];

class ProjectList extends PureComponent {
    render() {
        return (
            <List
                className="coverCardList"
                rowKey="id"
                grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Card
                            className="card"
                            hoverable
                            cover={<img alt={item.title} src={item.cover} />}
                        >
                            <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
                            <div className="cardItemContent">
                                <span>{moment(item.updatedAt).fromNow()}</span>
                                <div className="avatarList">
                                    <AvatarList size="mini">
                                        {item.members.map(member => (
                                            <AvatarList.Item
                                                key={`${item.id}-avatar-${member.id}`}
                                                src={member.avatar}
                                                tips={member.name}
                                            />
                                        ))}
                                    </AvatarList>
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

export default ProjectList;