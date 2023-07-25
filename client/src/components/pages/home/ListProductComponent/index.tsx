import { Link } from 'react-router-dom';
import { Col, Row, Image } from 'antd';

const ListProductComponent = (data: any) => {
    return (
        <Row>
            {data.map((el: any) => (
                <Col xs={12} lg={6} >
                    <Link className='link' to="/">
                        <div className='card-item'>
                            <Image
                                className='image'
                                src={el.images[0]}
                                preview={false}
                            />
                            <div>
                                <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                <div className='price'>
                                    <span>26.690.000</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default ListProductComponent