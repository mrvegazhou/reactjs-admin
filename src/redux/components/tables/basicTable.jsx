import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Mock from 'mockjs';
import './basicTable.css';
import { Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm } from 'antd';
import { catchIndex } from '@/utils/common';
import TableList from '@/redux/components/tables/tableList';
import CollectionCreateForm from './CustomizedForm';
import Filter from '@/redux/components/tables/Filter';
const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;

import address from '@/utils/cityData.json';
import data from '@/utils/tableList.json';
Mock.mock('/address', address);
Mock.mock('/data', data);

class BasicTableComp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            address: '',
            timeRange: '',
            visible: false, //新建窗口隐藏
            dataSource: [],
            count: data.length,
            selectedRowKeys: [],
            tableRowKey: 0,
            isUpdate: false,
            loading: true,
        };
    }

    getData = () => {
        axios.get('/data')
            .then(function (response) {
                console.log(response.data);
                this.setState({
                    dataSource: response.data,
                    loading:false
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    };

    //地址级联选择
    Cascader_Select = (value) => {
        const { dataSource } = this.state;
        if(value.length===0){
            this.setState({
                address: value,
                dataSource: [],
            });
            this.getData();
        }else{
            this.setState({
                address: value,
                dataSource: dataSource.filter(item => item.address === value.join(' / '))
            });
        }
    };

    //用户名搜索
    onSearchUserName = (value) => {
        // console.log(value);
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => item.name.indexOf(value) !== -1),
            loading: false,
        })
    };

    //用户名输入
    onChangeUserName = (e) => {
        const value = e.target.value;
        this.setState({
            userName: value,
        })
    };

    //时间选择
    RangePicker_Select = (date, dateString) => {
        console.log(date, dateString);
        const { dataSource } = this.state;
        const startime = moment(dateString[0]);
        const endtime = moment(dateString[1]);
        if(date.length===0){
            this.setState({
                timeRange: date,
                dataSource: [],
            });
            this.getData();
        }else{
            this.setState({
                timeRange: date,
                dataSource: dataSource.filter(item => (moment(item.createtime.substring(0,10)) <= endtime  && moment(item.createtime.substring(0,10)) >= startime) === true)
            });
        }
    };

    onDelete = (key) => {
        // const dataSource = [...this.state.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };

    //点击修改
    editClick = (key) => {
        const form = this.form;
        const { dataSource } = this.state;
        const index = catchIndex(dataSource, key);
        form.setFieldsValue({
            key: key,
            name: dataSource[index].name,
            sex: dataSource[index].sex,
            age: dataSource[index].age,
            address: dataSource[index].address.split(' / '),
            phone: dataSource[index].phone,
            email: dataSource[index].email,
            website: dataSource[index].website,
        });
        this.setState({
            visible: true,
            tableRowKey: key,
            isUpdate: true,
        });
    };

    //渲染
    componentDidMount(){
        axios.get('/address')
            .then(function (response) {
                response.data.map(function(province){
                    options.push({
                        value: province.name,
                        label: province.name,
                        children: province.city.map(function(city){
                            return {
                                value: city.name,
                                label: city.name,
                                children: city.area.map(function(area){
                                    return {
                                        value: area,
                                        label: area,
                                    }
                                })
                            }
                        }),
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.getData();
    }

    handleDeleteItems = () => {

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render(){
        const { userName, address, timeRange, dataSource, visible, isUpdate, loading, selectedRowKeys } = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        const filterProps = {
            onFilterChange(value) {
            },
            onAdd() {
            },
        }
        return(
            <div>
                <div className='formBody'>

                    <Filter {...filterProps} />

                    {/*<Row gutter={16}>*/}
                    {/*    <Col className="gutter-row" sm={8}>*/}
                    {/*        <Search*/}
                    {/*            placeholder="Input Name"*/}
                    {/*            allowClear*/}
                    {/*            prefix={<Icon type="user" />}*/}
                    {/*            value={userName}*/}
                    {/*            onChange={this.onChangeUserName}*/}
                    {/*            onSearch={this.onSearchUserName}*/}
                    {/*        />*/}
                    {/*    </Col>*/}
                    {/*    <Col className="gutter-row" sm={8}>*/}
                    {/*        <InputGroup compact>*/}
                    {/*            <Cascader style={{ width: '100%' }} options={options} placeholder="Select Address"  value={address} onChange={this.Cascader_Select}/>*/}
                    {/*        </InputGroup>*/}
                    {/*    </Col>*/}
                    {/*    <Col className="gutter-row" sm={8}>*/}
                    {/*        <RangePicker style={{ width:'100%' }} onChange={this.RangePicker_Select} value={timeRange}/>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    {/*<Row gutter={16}>*/}
                    {/*    <div className='btnOpera'>*/}
                    {/*        <Button type="primary" onClick={null} style={{marginRight:'10px'}}>查询</Button>*/}
                    {/*        <Button type="primary" onClick={null} style={{background:'#f8f8f8', color: '#108ee9'}}>重置</Button>*/}
                    {/*    </div>*/}
                    {/*</Row>*/}

                    <Row style={{marginTop: 24, textAlign: 'left', fontSize: 13 }}>
                        <div style={{ marginBottom: 0 }}>
                            <Button type="primary" onClick={this.start}
                                    disabled={!hasSelected} loading={loading}>删除</Button>
                            <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                        </div>
                    </Row>

                    <TableList
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />

                    {/*{*/}
                    {/*    isUpdate*/}
                    {/*        ?*/}
                    {/*    <CollectionCreateForm ref={this.saveFormRef}*/}
                    {/*                          visible={visible}*/}
                    {/*                          onCancel={this.handleCancel}*/}
                    {/*                          onCreate={this.handleUpdate}*/}
                    {/*                          title="修改信息"*/}
                    {/*                          okText="更新"*/}
                    {/*    />*/}
                    {/*        :*/}
                    {/*    <CollectionCreateForm ref={this.saveFormRef}*/}
                    {/*                          visible={visible}*/}
                    {/*                          onCancel={this.handleCancel}*/}
                    {/*                          onCreate={this.handleCreate}*/}
                    {/*                          title="新建信息"*/}
                    {/*                          okText="创建"*/}
                    {/*    />*/}
                    {/*}*/}

                </div>
            </div>
        );
    }
}

export default BasicTableComp;