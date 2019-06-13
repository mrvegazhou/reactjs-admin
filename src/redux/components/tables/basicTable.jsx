import React, { PureComponent } from 'react';

import './basicTable.css';
import {Row, Button, Modal, Divider} from 'antd';
import TableList from '@/redux/components/tables/tableList';
import CustomizedForm from './customizedForm';
import SearchForm from "@/redux/components/tables/SearchForm";

class BasicTableComp extends PureComponent{

    constructor(props) {
        super(props);
        this.handleUpdateModalVisible = this.handleUpdateModalVisible.bind(this);
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

    // 选中table的复选框的动作
    handleSelectRows = rows => {
        this.props.handleSelectRows(rows);
    };

    //点击修改弹出modal
    handleUpdateModalVisible(flag, record)  {
        this.props.handleUpdateModalVisible(flag, record);
    };

    //点击新建弹出modal
    handleModalVisible = flag => {
        this.props.handleModalVisible(flag);
    };

    //
    handleUpdate = fields => {
        alert("handleUpdate...");
    };

    render(){
        const { dataSource, loading, columns, pagination, selectedRows, modalVisible, formValues, onChange } = this.props;
        const hasSelected = selectedRows.length > 0 ;

        return(
            <div>
                <SearchForm>
                    {this.props.children[0]}
                </SearchForm>

                <Row style={{marginTop: 24, textAlign: 'left', fontSize: 13 }}>
                    <div style={{ marginBottom: 0 }}>
                        <Button type="primary" icon="plus-square-o" onClick={this.handleModalVisible} style={{marginRight: 5}}>新增</Button>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={this.handleDelete} disabled={!hasSelected} loading={loading}>删除</Button>
                        <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRows.length} 个对象` : ''}</span>
                    </div>
                </Row>

                <TableList
                    dataSource={dataSource}
                    selectedRows={selectedRows}
                    columns={columns}
                    loading={loading}
                    handleDeleteItem={this.props.handleDeleteItem}
                    handleDeleteItems={this.props.handleDeleteItems}
                    handleUpdateModalVisible={this.handleUpdateModalVisible}
                    onSelectRow={this.handleSelectRows}
                    pagination={pagination}
                    onChange={onChange}
                />

                <CustomizedForm
                    modalVisible={modalVisible}
                    values={formValues}
                    key="edit"
                    handleUpdateModalVisible={this.handleUpdateModalVisible}
                    handleUpdate={this.handleUpdate}
                >
                    {this.props.children[1]}
                </CustomizedForm>
            </div>
        );
    }
}

export default BasicTableComp;