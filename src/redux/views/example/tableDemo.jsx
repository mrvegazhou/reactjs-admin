import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import BasicTable from "@/redux/components/tables/basicTable";
import { getUserList } from "@/http/api";
import SearchFormChildren from "@/redux/views/example/SearchFormChildren";
import customFormChildren from "@/redux/views/example/CustomFormChildren";

class TableDemo extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: true,
            pagination: {
                current: 1,
                pageSize: 1,
                showQuickJumper: false,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`
            },

            filter: {},

            modalVisible: false,
            formValues: {},
            selectedRows: []
        };

        //自定义列
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
        this.handleDeleteItems = this.handleDeleteItems.bind(this);
        this.handleSelectRows = this.handleSelectRows.bind(this);
        this.handleUpdateModalVisible = this.handleUpdateModalVisible.bind(this);
    }

    //渲染list
    componentDidMount(){
        this.fetch({
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            filter: this.state.filter
        });
    }

    handleDeleteItem(key) {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleDeleteItems() {

    }

    //多选
    handleSelectRows(rows) {
        this.setState({
            selectedRows: rows
        });
    }

    //弹出修改编辑框
    handleUpdateModalVisible(flag, record) {
        this.setState({
            modalVisible: !!flag,
            formValues: record || {},
        });
    }

    //弹出空白展示框
    handleModalVisible(flag) {
        this.setState({
            modalVisible: !!flag,
        });
    };

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

    refresh = () => {
        let query = {
            pageIndex: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize,
            sortBy: this.state.sorter.field,
            descending: this.state.sorter.order === 'descend',
            filter: this.state.filter
        };
        this.fetch(query);
    }

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
        return(
            <div className='formBody'>
                <BasicTable
                    columns={this.columns}
                    handleDeleteItems={this.handleDeleteItems}
                    handleDeleteItem={this.handleDeleteItem}
                    onChange={this.handleTableChange}
                    pagination={this.state.pagination}
                    dataSource={this.state.dataSource}
                    loading={this.state.loading}
                    selectedRows={this.state.selectedRows}
                    formValues={this.state.formValues}
                >
                    <div id="SearchFormChildren">
                        <SearchFormChildren />
                    </div>
                    <div id="CustomizedForm">
                        <customFormChildren />
                    </div>
                </BasicTable>
            </div>
        )
    }
}

export default connect()(TableDemo);
