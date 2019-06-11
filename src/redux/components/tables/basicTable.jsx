import React, { Component } from 'react';
import axios from "axios";
import Mock from 'mockjs';
import './basicTable.css';
import {Row, Button, Modal} from 'antd';
import TableList from '@/redux/components/tables/tableList';
import Filter from '@/redux/components/tables/Filter';
import CustomizedForm from './customizedForm';

import data from '@/utils/tableList.json';

Mock.mock('/data', data);

class BasicTableComp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectedRows: [],
            tableRowKey: 0,
            loading: true,

            modalVisible: false,
            formValues: {}
        };
    }

    getData = () => {
        axios.get('/data')
            .then(function (response) {
                this.setState({
                    dataSource: response.data,
                    loading:false
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    };

    // 删除多行
    handleDelete = (keys) => {
        const { selectedRows } = this.state;
        Modal.confirm({
            title: '批量删除操作',
            content: '确定执行批量删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {

            },
        });
    };

    // 删除单行
    handleDeleteItems = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    // 选中table的复选框的动作
    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    //渲染list
    componentDidMount(){
        this.getData();
    }

    //点击修改弹出modal
    handleUpdateModalVisible = (flag, record) => {
        this.setState({
            modalVisible: !!flag,
            formValues: record || {},
        });
    };

    //点击新建弹出modal
    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    //
    handleUpdate = fields => {
        const { dispatch } = this.props;
        console.log(dispatch, "modal dispatch");
    };

    handleFilter = permission =>{
        // 过滤没有权限的页面
        if(!permission || permission===role ) return true
        return false
    }


    render(){
        const { dataSource, loading, selectedRows, modalVisible,formValues } = this.state;
        const hasSelected = selectedRows.length > 0 ;
        const updateMethods = {
            handleUpdateModalVisible: this.handleUpdateModalVisible,
            handleUpdate: this.handleUpdate,
        };

        return(
            <div>
                <div className='formBody'>

                    <Filter />

                    <Row style={{marginTop: 24, textAlign: 'left', fontSize: 13 }}>
                        <div style={{ marginBottom: 0 }}>
                            this.handleFilter(ele.permission) &&
                            <Button type="primary" icon="plus-square-o" onClick={this.handleModalVisible} style={{marginRight: 5}}>新增</Button>
                            <Button type="primary" onClick={this.handleDelete} disabled={!hasSelected} loading={loading}>删除</Button>
                            <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRows.length} 个对象` : ''}</span>
                        </div>
                    </Row>

                    <TableList
                        dataSource={dataSource}
                        selectedRows={selectedRows}
                        handleDelete={this.handleDeleteItems}
                        handleUpdateModalVisible={this.handleUpdateModalVisible}
                        loading={loading}
                        onSelectRow={this.handleSelectRows}
                    />

                    <CustomizedForm
                        {...updateMethods}
                        modalVisible={modalVisible}
                        values={formValues}
                        key="edit"
                    />
                </div>
            </div>

        );
    }
}

export default BasicTableComp;