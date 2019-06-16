import React, { PureComponent } from 'react';
import { List, Icon, Tag } from 'antd';
import ArticleContent from '@/redux/components/articleContent/content';
import './article.less';

const list = [{
    activeUser: 153882,
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    content: "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
    cover: "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
    createdAt: "2019-06-15T06:30:39.130Z",
    description: "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
    href: "https://ant.design",
    id: "fake-list-0",
    like: 106,
    logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
    members: [  {avatar: "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png", name: "曲丽丽", id: "member1"},
                {avatar: "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png", name: "王昭君", id: "member2"},
                {avatar: "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png", name: "董娜娜", id: "member3"}
    ],
    message: 16,
    newUser: 1343,
    owner: "付小小",
    percent: 92,
    star: 105,
    status: "active",
    subDescription: "那是一种内在的东西， 他们到达不了，也无法触及的",
    title: "Alipay",
    updatedAt: "2019-06-15T06:30:39.130Z",
}];

class Article extends PureComponent {

    render() {
        const IconText = ({type, text}) => (
                                        <span>
                                            <Icon type={type} style={{marginRight: 8}}/>
                                                {text}
                                        </span>
        );
        return (
            <List
                size="large"
                className='articleList'
                rowKey="id"
                itemLayout="vertical"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText type="star-o" text={item.star} />,
                            <IconText type="like-o" text={item.like} />,
                            <IconText type="message" text={item.message} />,
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <a className='listItemMetaTitle' href={item.href}>
                                    {item.title}
                                </a>
                            }
                            description={
                                <span>
                                  <Tag>Ant Tabs</Tag>
                                  <Tag>设计语言</Tag>
                                  <Tag>蚂蚁金服</Tag>
                                </span>
                            }
                        />
                        <ArticleContent data={item} />
                    </List.Item>
                )}
            />
        );
    }
}

export default Article;
