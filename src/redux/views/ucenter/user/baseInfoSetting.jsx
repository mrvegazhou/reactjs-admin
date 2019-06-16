import React, { PureComponent, Fragment } from 'react';
import { Form, Input, Upload, Select, Button } from 'antd/lib/index';
import '@/redux/views/ucenter/user/baseInfoSetting';

const FormItem = Form.Item;
const { Option } = Select;

const AvatarView = ({ avatar }) => (
    <Fragment>
        <div className='avatar_title'>
            <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
        </div>
        <div className='avatar'>
            <img src={avatar} alt="avatar" />
        </div>
        <Upload fileList={[]}>
            <div className='button_view'>
                <Button icon="upload">
                    <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
                </Button>
            </div>
        </Upload>
    </Fragment>
);

class BaseInfoSetting extends PureComponent {
    componentDidMount() {
        this.setBaseInfo();
    }

    setBaseInfo = () => {

    };

    getAvatarURL() {
        const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
        return url;
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <div className='baseView'>
                <div className='left'>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <FormItem label="email">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'email is not correct',
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Form.create()(BaseInfoSetting)
