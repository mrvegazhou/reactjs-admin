import React, { Component } from 'react';
import axios from 'axios';
import Mock from 'mockjs';
import './basicTable.css';
import { Row, Button } from 'antd';
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

    handleDelete = (key) => {
        // const dataSource = [...this.state.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };


    handleDeleteItems = () => {

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
        console.log(record, !!flag, "------handleUpdateModalVisible-----");
        this.setState({
            modalVisible: !!flag,
            formValues: record || {},
        });
    }
    handleUpdate = fields => {
        const { dispatch } = this.props;
        console.log(dispatch, "modal dispatch");
    };

    render(){
        const { dataSource, loading, selectedRows, modalVisible,formValues } = this.state;
        const hasSelected = selectedRows.length > 0;

        const filterProps = {
            onFilterChange(value) {
            },
            onAdd() {
            },
        }

        const updateMethods = {
            handleUpdateModalVisible: this.handleUpdateModalVisible,
            handleUpdate: this.handleUpdate,
        };


        return(
            <div>
                <div className='formBody'>

                    <Filter {...filterProps} />

                    <Row style={{marginTop: 24, textAlign: 'left', fontSize: 13 }}>
                        <div style={{ marginBottom: 0 }}>
                            <Button type="primary" onClick={this.start}
                                    disabled={!hasSelected} loading={loading}>删除</Button>
                            <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRows.length} 个对象` : ''}</span>
                        </div>
                    </Row>

                    <TableList
                        dataSource={dataSource}
                        selectedRows={selectedRows}
                        handleDelete={this.handleDelete}
                        handleUpdateModalVisible={this.handleUpdateModalVisible}
                        loading={loading}
                        onSelectRow={this.handleSelectRows}
                    />

                    <CustomizedForm
                        {...updateMethods}
                        modalVisible={modalVisible}
                        values={formValues}
                    />

                </div>
            </div>
        );
    }
}

export default BasicTableComp;