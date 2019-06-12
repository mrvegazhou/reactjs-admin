import React, { PureComponent } from 'react';

import './basicTable.css';
import {Row, Button, Modal} from 'antd';
import TableList from '@/redux/components/tables/tableList';
import Filter from '@/redux/components/tables/Filter';
import CustomizedForm from './customizedForm';

class BasicTableComp extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            formValues: {},
            selectedRows: []
        }
    }

    // 删除多行
    handleDelete = (keys) => {
        const { selectedRows } = this.props;
        Modal.confirm({
            title: '批量删除操作',
            content: '确定执行批量删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.props.handleDeleteByIds();
            },
        });
    };

    // 删除单行
    handleDeleteItem = (key) => {
        this.props.handleDeleteItem();
    }

    // 选中table的复选框的动作
    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

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

    render(){
        const { dataSource, loading, columns } = this.props;
        const { selectedRows, modalVisible, formValues } = this.state;
        const hasSelected = selectedRows.length > 0 ;
        const updateMethods = {
            handleUpdateModalVisible: this.handleUpdateModalVisible,
            handleUpdate: this.handleUpdate,
        };

        return(
            <div className='formBody'>

                <Filter />

                <Row style={{marginTop: 24, textAlign: 'left', fontSize: 13 }}>
                    <div style={{ marginBottom: 0 }}>
                        <Button type="primary" icon="plus-square-o" onClick={this.handleModalVisible} style={{marginRight: 5}}>新增</Button>
                        <Button type="primary" onClick={this.handleDelete} disabled={!hasSelected} loading={loading}>删除</Button>
                        <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRows.length} 个对象` : ''}</span>
                    </div>
                </Row>

                <TableList
                    dataSource={dataSource}
                    selectedRows={selectedRows}
                    columns={columns}
                    loading={this.props.loading}
                    handleDelete={this.handleDeleteItem}
                    handleUpdateModalVisible={this.handleUpdateModalVisible}
                    onSelectRow={this.handleSelectRows}

                />

                <CustomizedForm
                    {...updateMethods}
                    modalVisible={modalVisible}
                    values={formValues}
                    key="edit"
                />
            </div>
        );
    }
}

export default BasicTableComp;