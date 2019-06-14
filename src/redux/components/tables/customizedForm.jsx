import React, { PureComponent } from 'react';
import { Modal, Form, Input, Radio, Button, Cascader, Select, AutoComplete } from 'antd';
import city from '@/utils/city'
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

class CustomizedForm extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    handleModalVisible (flag) {
        this.props.handleModalVisible(flag)
    }

    renderFooter = () => {
        return [
            <Button key="cancel" onClick={this.props.handleModalVisible.bind(this, false)}>
                取消
            </Button>,
            <Button key="ok" type="primary">
                确认
            </Button>,
        ];
    };

    render(){
        const { modalVisible, title } = this.props;

        return (
            <Modal title={title}
                   visible={modalVisible}
                   destroyOnClose
                   footer={this.renderFooter()}
                   onCancel={this.handleModalVisible.bind(this, false)}
                   afterClose={() => this.props.handleModalVisible()}
            >
                {this.props.children}
            </Modal>
        );
    }
}

export default Form.create({ name: 'modalForm' })(CustomizedForm);