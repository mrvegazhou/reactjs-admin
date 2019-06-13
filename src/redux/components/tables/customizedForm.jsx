import React, { PureComponent } from 'react';
import { Modal, Form, Input, Radio, Button, Cascader, Select, AutoComplete } from 'antd';
import city from '@/utils/city'
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

class CustomizedForm extends PureComponent {

    constructor(props) {
        super(props);
        this.handleUpdateModalVisible = this.handleUpdateModalVisible.bind(this);
    }

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

    handleUpdateModalVisible() {
        this.props.handleUpdateModalVisible(false, this.props.values)
    }

    renderFooter = () => {
        return [
            <Button key="cancel" onClick={this.handleUpdateModalVisible}>
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
                   onCancel={() => this.props.handleUpdateModalVisible(false, values)}
                   afterClose={() => this.props.handleUpdateModalVisible()}
            >

            </Modal>
        );
    }
}

export default Form.create({ name: 'modalForm' })(CustomizedForm);