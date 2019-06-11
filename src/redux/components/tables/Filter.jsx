import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, DatePicker, Input, Cascader } from 'antd'
import city from '@/utils/city'
import "./Filter.css";
const { Search } = Input
const { RangePicker } = DatePicker
const FormItem = Form.Item;

class Filter extends Component {
    componentDidUpdate(prevProps, prevState) {
        // if (Object.keys(prevProps.filter).length === 0) {
        //     this.handleReset()
        // }
    }

    handleReset = () => {
        const { form } = this.props
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
        this.handleSubmit()
    }

    handleFields = fields => {
        const { createTime } = fields
        if ( createTime!=void 0 && createTime.length>0 ) {
            fields.createTime = [
                moment(createTime[0]).format('YYYY-MM-DD'),
                moment(createTime[1]).format('YYYY-MM-DD'),
            ]
        }
        return fields
    }

    handleAdd = () => {
        this.props.onAdd(true)
    }

    handleSubmit = () => {
        const { form } = this.props
        const { getFieldsValue } = form

        let fields = getFieldsValue()
        fields = this.handleFields(fields)
    }

    handleChange = (key, values) => {
        const { form } = this.props
        const { getFieldsValue } = form

        let fields = getFieldsValue()
        fields[key] = values
        fields = this.handleFields(fields)
    }

    render() {

        const { onAdd, form } = this.props;
        const { getFieldDecorator } = form;

        // let initialCreateTime = []
        // if (filter.createTime && filter.createTime[0]) {
        //     initialCreateTime[0] = moment(filter.createTime[0])
        // }
        // if (filter.createTime && filter.createTime[1]) {
        //     initialCreateTime[1] = moment(filter.createTime[1])
        // }

        return (
            <Form layout="inline" style={{marginBottom: '20px'}}>
                <FormItem label="Name">
                    {getFieldDecorator('name')(
                        <Search
                            placeholder='Search Name'
                            onSearch={this.handleSubmit}
                        />
                    )}
                </FormItem>
                <FormItem label="Address">
                    {getFieldDecorator('address')(
                        <Cascader
                            style={{ width: '100%' }}
                            options={city}
                            placeholder='Please pick an address'
                            onChange={this.handleChange.bind(this, 'address')}
                        />
                    )}
                </FormItem>
                <FormItem label="Time">
                            {getFieldDecorator('createTime')(
                                <RangePicker
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange.bind(this, 'createTime')}
                                />
                            )}
                </FormItem>
                <Button type="primary"  onClick={this.handleSubmit} style={{marginRight: '5px'}}>
                    Search
                </Button>
                <Button onClick={this.handleReset}  style={{marginRight: '5px'}}>
                    Reset
                </Button>
                <Button onClick={this.handleAdd}>
                    Create
                </Button>
            </Form>
        )
    }

}

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object
}

export default Form.create()(Filter)