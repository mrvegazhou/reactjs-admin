import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './basicTableList.less';

class BasicTable extends PureComponent {
    constructor(props) {
        super(props);
        const { columns } = props;

        this.state = {
            selectedRowKeys: [],
        };
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    render() {
        const { selectedRowKeys } = this.state;
        const { data = {}, rowKey, ...rest } = this.props;
        const { list = [], pagination } = data;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        };

        return (
            <div className={styles.standardTable}>
                <Table
                    rowKey={rowKey || 'key'}
                    rowSelection={rowSelection}
                    dataSource={list}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    {...rest}
                />
            </div>
        );
    }
}

export default BasicTable;
