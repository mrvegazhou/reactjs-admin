import React, { PureComponent } from 'react'
import moment from 'moment'
import {Form, Button, DatePicker, Input, Cascader, Divider} from 'antd'
import city from '@/utils/city'
import "./Filter.css";

const SearchForm = (props) => {
    const handleReset = () => {
        const { form } = props
        const { getFieldsValue, setFieldsValue } = form

        const fields = getFieldsValue()
        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = []
                } else {
                    fields[item] = undefined
                }
            }
        }
        setFieldsValue(fields)
        handleSubmit()
    }

    const handleFields = fields => {
        const { createTime } = fields
        if ( createTime!=void 0 && createTime.length>0 ) {
            fields.createTime = [
                moment(createTime[0]).format('YYYY-MM-DD'),
                moment(createTime[1]).format('YYYY-MM-DD'),
            ]
        }
        return fields
    }

    const handleSubmit = () => {
        const { form } = props
        const { getFieldsValue } = form

        let fields = getFieldsValue()
        fields = handleFields(fields)
    }



    const { onAdd, form } = props;

    return (
        <Form layout="inline" style={{marginBottom: '70px'}}>
            {props.children}
            <div style={{float: 'right'}}>
                <Button type="primary"  onClick={handleSubmit} style={{marginRight: '5px'}}>
                    查询
                </Button>
                <Divider type="vertical" />
                <Button onClick={handleReset}  style={{marginRight: '5px'}}>
                    重置
                </Button>
            </div>
        </Form>
    )
};

export default Form.create()(SearchForm)