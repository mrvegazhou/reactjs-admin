import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm } from 'antd';
import data from '@/utils/cityData.json';

const Search = Input.Search;
const InputGroup = Input.Group;

class BasicTableComp extends Component{
    render(){
        return(
            <div>
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="Input Name"
                                prefix={<Icon type="user" />}
                                value={null}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default BasicTableComp;