import React, { PureComponent } from 'react';
import { Table, Icon, Popconfirm, Modal } from 'antd';
import moment from 'moment';
import DropOption from '@/redux/components/tables/DropOption';

export default class FormTable extends PureComponent{
    constructor(props){
        super(props);
    }

    //获取列信息
    getColumns = () => {
        let columns = [{
            title: '操作',
            dataIndex: 'opera',
            width:100,
            render: (text, record) =>
                <DropOption
                    onMenuClick={e => this.handleMenuClick(true, record, e)}
                    menuOptions={[
                        { key: '1', name: '编辑' },
                        { key: '2', name: "删除" },
                    ]}
                />
        }];
        columns.unshift(this.props.columns[0]);
        return columns;
    }

    handleMenuClick = (flag, record, e) => {
        const { handleDelete, handleUpdateModalVisible } = this.props;
        if (e.key === '1') {
            handleUpdateModalVisible(flag, record)
        } else if (e.key === '2') {
            Modal.confirm({
                title: '删除操作',
                content: '确定删除该任务吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => handleDelete(record.key),
            });
        }
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }
    };

    render(){
        const { dataSource, loading } = this.props;



        const rowSelection = {
            // selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User'
            }),
        };
        return(
            <Table
                rowSelection={rowSelection}
                columns={this.getColumns()}
                dataSource={dataSource}
                bordered={true}
                scroll={{x:'100%'}}
                className='formTable'
                loading={loading}
            />
        )
    }
}

