import React, {Component} from 'react'
import { Button ,Row,Col} from 'antd'
import "@/redux/components/error/40x.css";


class Error404 extends Component {
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
            <Row gutter={24} className='wrap-404' >
                <Col offset={2} sm={10} className='img-box' xs={20} />
                <Col offset={2} sm={10} className='content' xs={20} >
                    <h1>404</h1>
                    <p className='desc'>抱歉，你访问的页面不存在</p>
                    <div>
                        <Button
                            onClick={this.goback}
                            type='primary'
                        >返回首页</Button>
                    </div>
                </Col>

            </Row>
        )
    }
}


export default Error404