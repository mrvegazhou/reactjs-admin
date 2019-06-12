import React, { PureComponent } from 'react';
import basicTable from "@/redux/components/tables/basicTable";

class Demo extends PureComponent{
    constructor(props) {
        super(props);
        this.column = [
            {
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
            }
        ]
    }

    render(){

        return(
            <basicTable column={this.column}>

            </basicTable>
        )
    }
}

export default Demo;
