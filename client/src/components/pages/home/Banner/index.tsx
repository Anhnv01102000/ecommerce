import React from 'react';
import { Col, Image, Row } from 'antd'
import "./style.scss"
import { Link } from 'react-router-dom';

const BannerComponent = () => {
    return (
        <Row className='banner'>
            <Col xs={24} sm={12} md={6}>
                <div className='banner-item'>
                    <Link style={{ color: "#fff" }} to="/iphone">
                        <div>
                            <Image
                                className='banner-img'
                                src='https://fstudiobyfpt.com.vn/ContentV2/assets/img/iphone.png'
                                preview={false}
                            />
                        </div>
                        <p>iPhone</p>
                    </Link>
                </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <div className='banner-item'>
                    <Link style={{ color: "#fff" }} to="/ipad">
                        <div>
                            <Image
                                className='banner-img'
                                src='https://fstudiobyfpt.com.vn/ContentV2/assets/img/ipad..png'
                                preview={false}
                            />
                        </div>
                        <p>iPad</p>
                    </Link>
                </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <div className='banner-item'>
                    <Link style={{ color: "#fff" }} to="/mac">
                        <div>
                            <Image
                                className='banner-img'
                                src='https://fstudiobyfpt.com.vn/ContentV2/assets/img/mac..png'
                                preview={false}
                            />
                        </div>
                        <p>Mac</p>
                    </Link>
                </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
                <div className='banner-item'>
                    <Link style={{ color: "#fff" }} to="/watch">
                        <div>
                            <Image
                                className='banner-img'
                                src='https://fstudiobyfpt.com.vn/ContentV2/assets/img/Apple-watch..png'
                                preview={false}
                            />
                        </div>
                        <p>Watch</p>
                    </Link>
                </div>
            </Col>
        </Row>
    )
}

export default BannerComponent