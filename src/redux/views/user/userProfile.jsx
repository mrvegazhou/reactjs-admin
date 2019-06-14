import React, { PureComponent } from 'react';
import './userProfile.less';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd';
import {connect} from "react-redux";

class UserProfile extends PureComponent {
    state = {
        newTags: [],
    }

    componentDidMount() {

    }

    render() {
        const { newTags, inputVisible, inputValue } = this.state;
        const tags = [{key:1, label:'很有想法的'}, {key:2, label:'专注设计'}, {key:3, label:'辣~大长腿川妹子'}, {key: 4, label:'海纳百川'}];
        const notice = [];
        return (
            <div className="main">
                <Row gutter={24}>
                    <Col lg={7} md={24}>
                        <Card bordered={false} style={{ marginBottom: 24 }} loading={false}>
                            <div>
                                <div className="avatarHolder">
                                    <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                                    <div className="name">Mr.liu</div>
                                    <div>海纳百川，有容乃大</div>
                                </div>
                                <div className="detail">
                                    <p>
                                        <i className="title" />交互专家
                                    </p>
                                    <p>
                                        <i className="group" />蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
                                    </p>
                                    <p>
                                        <i className="address" />浙江省杭州市
                                    </p>
                                </div>
                                <Divider dashed />
                                <div className="tags">
                                    <div className="tagsTitle">标签</div>
                                    {tags.map(item => (
                                        <Tag key={item.key}>{item.label}</Tag>
                                    ))}
                                    <Input
                                        ref={this.saveInputRef}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleInputConfirm}
                                        onPressEnter={this.handleInputConfirm}
                                    />
                                    <Tag
                                        onClick={this.showInput}
                                        style={{ background: '#fff', borderStyle: 'dashed' }}
                                    >
                                        <Icon type="plus" />
                                    </Tag>
                                </div>
                                <Divider style={{ marginTop: 16 }} dashed />
                                <div className="team">
                                    <div className="teamTitle">团队</div>
                                    <Spin spinning={true}>
                                        <Row gutter={36}>
                                            {notice.map(item => (
                                                <Col key={item.id} lg={24} xl={12}>
                                                    <Link to={item.href}>
                                                        <Avatar size="small" src={item.logo} />
                                                        {item.member}
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Spin>
                                </div>
                            </div>


                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect()(UserProfile);