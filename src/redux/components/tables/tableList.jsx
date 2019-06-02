import React, { Component } from 'react';
import { Table, Icon, Popconfirm } from 'antd';
import moment from 'moment';
import DropOption from '@/redux/components/tables/DropOption';

export default class FormTable extends Component{
    constructor(props){
        super(props);
    }


    handleMenuClick = (record, e) => {
        const { onDelete, editClick, } = this.props

        if (e.key === '1') {
            editClick(record)
        } else if (e.key === '2') {
            confirm({
                title: i18n.t`Are you sure delete this record?`,
                onOk() {
                    onDelete(record.id)
                },
            })
        }
    }

    render(){
        const { rowSelection, dataSource, loading } = this.props;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: 80,
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
                    onMenuClick={e => this.handleMenuClick(record, e)}
                    menuOptions={[
                        { key: '1', name: '编辑' },
                        { key: '2', name: "删除" },
                    ]}
                />
        }];

        return(
            <Table
                rowSelection={dataSource.length ? rowSelection : null}
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

