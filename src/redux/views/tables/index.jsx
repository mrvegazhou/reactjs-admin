import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Icon } from "antd";
import Currency from "react-currency-formatter";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";
import { getList } from "@/redux/actions";


const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


class TableList extends Component {
    state = {
        selectedRowKeys: [],

        modalVisible: false,
        updateModalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        stepFormValues: {},
    };

    columns = [
        {
            title: '规则名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            align: 'right',
            render: val => `${val} 万`,
            // mark to display a total number
            needTotal: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            filters: [
                {
                    text: status[0],
                    value: 0,
                },
                {
                    text: status[1],
                    value: 1,
                },
                {
                    text: status[2],
                    value: 2,
                },
                {
                    text: status[3],
                    value: 3,
                },
            ],
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '上次调度时间',
            dataIndex: 'updatedAt',
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
                    <Divider type="vertical" />
                    <a href="">订阅警报</a>
                </Fragment>
            ),
        }
    ];

    getValue = obj =>
        Object.keys(obj)
            .map(key => obj[key])
            .join(",");

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onRow = (record, rowIndex) => {
        return {
            onClick: e => this.props.onView(record)
        };
    };

    onChange = (pagination, filtersArg, sorter) => {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            let keys = key.split(".");
            const newObj = { ...obj };

            let value = this.getValue(filtersArg[key]);

            if (value) {
                newObj[keys[0]] = value;
            } else {
                delete newObj[keys[0]];
            }

            return newObj;
        }, {});

        const params = {
            pagination,
            filters
        };

        if (sorter.field) {
            const key = sorter.field.split(".");
            params.sorter = `${key[0]}_${sorter.order}`;
        }

        this.props.getList(params);
    };

    parseToFilters = items => {
        return _.map(items, item => {
            return {
                text: item.name,
                value: item.id
            };
        });
    };

    render() {
        const {
            rowKey,
            pagination,
            dataSource,
            loading,
            brands,
            categories
        } = this.props;
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            columnWidth: "1%"
        };
        const filtersBrand = this.parseToFilters(brands);
        const filtersCategories = this.parseToFilters(categories);


        return (
            <Table
                rowKey={rowKey}
                columns={columns}
                pagination={pagination}
                dataSource={dataSource}
                loading={loading}
                rowSelection={rowSelection}
                onChange={this.onChange}
                onRow={this.onRow}
            />
        );
    }
}

const mapStateToProps = ({ list }) => {
    return {
        list
    };
};

export default connect(
    mapStateToProps,
    { getList }
)(TableList);