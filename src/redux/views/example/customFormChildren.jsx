import React from 'react'
import {AutoComplete, Cascader, Input, Radio} from "antd";
import city from "@/utils/city";

const customFormChildren = (props) => {
    return (
        <div>
            <FormItem label="姓名" {...formLayout} hasFeedback key="name">
                {getFieldDecorator('name', {
                    initialValue: values.name || '',
                    rules: [{ required: true, message: '请输入姓名！' }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="性别" {...formLayout} hasFeedback key="sex">
                {getFieldDecorator('sex', {
                    initialValue: values.sex || '',
                    rules: [{ required: true, message: '请选择性别！' }],
                })(
                    <Radio.Group style={{marginRight: 20}} >
                        <Radio value='男' >男</Radio>
                        <Radio value='女' >女</Radio>
                    </Radio.Group>
                )}
            </FormItem>
            <FormItem label="地址" {...formLayout} hasFeedback key="address">
                {getFieldDecorator('address', {
                    initialValue: address || '',
                    rules: [{ required: true, message: '请选择地址！' }],
                })(
                    <Cascader options={city}
                              placeholder='Please pick an address'
                    />
                )}
            </FormItem>
            <FormItem label="手机号" {...formLayout} hasFeedback  key="phone">
                {getFieldDecorator('phone', {
                    initialValue: values.phone || '',
                    rules: [{
                        pattern: /^1(3|4|5|7|8)\d{9}$/, message: "手机号码格式不正确！"
                    },{
                        required: true, message: '请输入手机号！'
                    }],
                })(
                    <Input addonBefore={"+86"} style={{ width: '100%' }} />
                )}
            </FormItem>
            <FormItem label="邮箱" {...formLayout} hasFeedback  key="email">
                {getFieldDecorator('email', {
                    initialValue: values.email || '',
                    rules: [{
                        type: 'email', message: '邮箱格式不正确！',
                    }, {
                        required: true, message: '请输入邮箱！',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="网址" {...formLayout} hasFeedback key="website">
                {getFieldDecorator('website', {
                    initialValue: values.website || '',
                    rules: [{required: true, message: '请输入网址！'}],
                })(
                    <AutoComplete
                        dataSource={websiteOptions}
                        onChange={this.handleWebsiteChange}
                    >
                        <Input />
                    </AutoComplete>
                )}
            </FormItem>
        </div>
    );
}