import React, { PureComponent } from 'react';
import { Modal, Form, Input, Radio, Button, Cascader, Select, AutoComplete } from 'antd';
import city from '@/utils/city'
import {reduxForm} from "redux-form";
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

class CustomizedForm extends PureComponent {

    componentDidMount(){
    }

    state = {
        autoCompleteResult: [],
        formVals: {}
    };

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    renderFooter = () => {
        const { handleUpdateModalVisible, values } = this.props;
        return [
            <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
                取消
            </Button>,
            <Button key="ok" type="primary">
                确认
            </Button>,
        ];
    };

    render(){
        const { form: { getFieldDecorator }, values, modalVisible, title, handleUpdateModalVisible } = this.props;
        const formLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const { autoCompleteResult } = this.state;
        const websiteOptions = autoCompleteResult.map(website => {
            return <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        });
        const address = values.address!=void 0 && values.address.split(' / ');
        return (
            <Modal title={title}
                   visible={modalVisible}
                   destroyOnClose
                   footer={this.renderFooter()}
                   onCancel={() => handleUpdateModalVisible(false, values)}
                   afterClose={() => handleUpdateModalVisible()}
            >

            </Modal>
        );
    }
}

export default Form.create({ name: 'modal_form' })(CustomizedForm);