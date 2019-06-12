import React from 'react';
import { Table, Modal } from 'antd';
import DropOption from '@/redux/components/tables/DropOption';

export default (props) => {
    const handleMenuClick = (flag, record, e) => {
        const { handleDelete, handleUpdateModalVisible } = props;
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
    };

    const handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const { onSelectRow } = props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }
    };

    //获取列信息
    const getColumns = () => {
            const columns = props.columns;
            const operaBtns = {
                title: '操作',
                dataIndex: 'opera',
                width:100,
                render: (text, record) =>
                    <DropOption
                        onMenuClick={e => handleMenuClick(true, record, e)}
                        menuOptions={[
                            { key: '1', name: '编辑' },
                            { key: '2', name: "删除" },
                        ]}
                    />
            };
            let resColumns = columns.filter(elem => elem.dataIndex!='opera');
            resColumns.push(operaBtns);
            return resColumns;
    };

    const { dataSource, loading } = props;
    const rowSelection = {
        // selectedRowKeys,
        onChange: handleRowSelectChange,
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User'
        }),
    };

    return (
        <Table
            rowSelection={rowSelection}
            columns={getColumns()}
            dataSource={dataSource}
            bordered={true}
            scroll={{x:'100%'}}
            className='formTable'
            loading={loading}
        />
    );
}

