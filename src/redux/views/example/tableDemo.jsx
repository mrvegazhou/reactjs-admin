import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import BasicTable from "@/redux/components/tables/basicTable";
import { getUserList } from "@/http/api";

class TableDemo extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            tableRowKey: 0,
            loading: true,
            pagination: {
                current: 1,
                pageSize: 3,
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`
            }
        };

        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: 80
            }, {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
            }, {
                title: '年龄',
                dataIndex: 'age',
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
                width:150,
            }
        ]

        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleDeleteByIds = this.handleDeleteByIds.bind(this);
    }

    //渲染list
    componentDidMount(){
        this.fetch({
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            filter: this.state.filter
        });
    }

    handleDeleteItem() {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleDeleteByIds() {

    }

    fetch = async (query = {}) => {
        this.setState({ loading: true });
        let dataRes = await getUserList(query);
        let data = dataRes.data;
        const pagination = { ...this.state.pagination };
        pagination.total = data.totalCount;
        this.setState({
            loading: false,
            dataSource: data.rows,
            pagination,
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
            pagination: pager,
            sorter: {
                field: sorter.field,
                order: sorter.order
            }
        });
        let query = {
            pageIndex: pager.current,
            pageSize: pager.pageSize,
            sortBy: sorter.field,
            descending: sorter.order === 'descend',
            filter: this.state.filter
        };
        this.fetch(query);
    };

    render(){
        const { dataSource } = this.state;
        return(
            <BasicTable
                columns={this.columns}
                handleDeleteByIds={this.handleDeleteByIds}
                handleDeleteItem={this.handleDeleteItem}
                onChange={this.handleTableChange}
                pagination={this.state.pagination}
                dataSource={this.state.dataSource}
                loading={this.state.loading}
            />
        )
    }
}

export default connect()(TableDemo);
