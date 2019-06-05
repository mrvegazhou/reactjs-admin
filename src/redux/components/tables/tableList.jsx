import React, { PureComponent } from 'react';
import { Table, Icon, Popconfirm, Modal } from 'antd';
import moment from 'moment';
import DropOption from '@/redux/components/tables/DropOption';

export default class FormTable extends PureComponent{
    constructor(props){
        super(props);
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

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: 80
        }, {
            title: '性别',
            dataIndex: 'sex',
            filters: [
                { text: '男', value: '男' },
                { text: '女', value: '女' },
            ],
            onFilter: (value, record) => record.sex.indexOf(value) === 0,
            width: 80,
        }, {
            title: '年龄',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
            width: 80,
        },{
            title: '地址',
            dataIndex: 'address',
            width: 180,
        },{
            title: '手机号',
            dataIndex: 'phone',
            width: 120,
        },{
            title: '邮箱',
            dataIndex: 'email',
            width:140,
        },{
            title: '网址',
            dataIndex: 'website',
            width:120,
        },{
            title: '创建时间',
            dataIndex: 'createtime',
            sorter: (a, b) => moment(a.createtime) - moment(b.createtime),
            width:150,
        },{
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
                columns={columns}
                dataSource={dataSource}
                bordered={true}
                scroll={{x:'100%'}}
                className='formTable'
                loading={loading}
            />
        )
    }
}

