import React from 'react'
import {Cascader, Form, Input, DatePicker} from "antd";
const FormItem = Form.Item;
const { Search } = Input;
const { RangePicker } = DatePicker;
import city from "@/utils/city";

const searchFormChildren = (props) => {

    const handleChange = (key, values) => {
        const { form } = props
        const { getFieldsValue } = form

        let fields = getFieldsValue()
        fields[key] = values
        fields = handleFields(fields)
    };

    const { form } = props
    const { getFieldDecorator } = form;

    return (
        <div>
            <FormItem label="Name">
                {getFieldDecorator('name')(
                    <Search
                        placeholder='Search Name'
                    />
                )}
            </FormItem>
            <FormItem label="Address">
                {getFieldDecorator('address')(
                    <Cascader
                        style={{ width: '100%' }}
                        options={city}
                        placeholder='Please pick an address'
                        onChange={handleChange.bind(this, 'address')}
                    />
                )}
            </FormItem>
            <FormItem label="Time">
                {getFieldDecorator('createTime')(
                    <RangePicker
                        style={{ width: '100%' }}
                        onChange={handleChange.bind(this, 'createTime')}
                    />
                )}
            </FormItem>
        </div>
    );
}

export default Form.create()(searchFormChildren);