import { Link } from 'react-router-dom';
import { Col, Row, Image } from 'antd';
import "./style.scss"

interface ChildProps {
    data: any[];
}

const ListProductComponent: React.FC<ChildProps> = ({ data }) => {
    console.log(data);

    return (
        <Row>
            {data?.map((el: any) => (
                <Col xs={12} lg={6} >
                    <div className='card-item'>
                        <Link className='link' to={`/product/${el._id}`}>
                            <Image
                                className='image'
                                src={el.images[0]}
                                preview={false}
                            />
                            <div>
                                <p className='name'>{el.name}</p>
                                <div className='price'>
                                    <span>{el.price.toLocaleString("en")}đ</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default ListProductComponent