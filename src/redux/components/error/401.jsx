import {Component} from "react";
import "@/redux/components/error/40x.css";


class Error401 extends Component {
    constructor(props) {
        super(props);
        this.gobBack = this.gobBack.bind(this);
    }
    gobBack() {
        const {history} = props
        history.push('/home')
    }
    render() {
        return (
            <Row gutter={24} className='wrap-401'>
                <Col offset={2} sm={10} className='img-box' xs={20} />
                <Col offset={2} sm={10} className='content' xs={20} >
                    <h1>401</h1>
                    <p className='desc'>抱歉，你无权访问该页面</p>
                    <div>
                        <Button
                            onClick={goback}
                            type='primary'
                        >返回首页</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Error401

