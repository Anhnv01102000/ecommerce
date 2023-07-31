import React, { useState } from 'react';
import { Col, Row, Image, Button } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"
import { Link } from 'react-router-dom';

const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
};


const images: any[] = [
    { value: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone_14_pro_max_pdp_position-1_deep_purple_color-0-650x650.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" },
    { value: "https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg" }

]



const ProductDetailComponent = () => {
    const [previewImage, setPreviewImage] = useState(images[0])
    const handleClick = (i: any) => {
        console.log(i);
        setPreviewImage(images[i])
    }
    return (
        <div className="product-detail">
            <div className="detail">
                <Row>
                    <Col xs={24} lg={12}>
                        <div className='slider-image'>
                            <div className='image-preview'>
                                <img src={previewImage.value} />
                            </div>
                            <Slider {...settings}>
                                {images.map((el, i) => (
                                    <div className='slider-item'>
                                        <Image
                                            className='image'
                                            src={el.value}
                                            preview={false}
                                            onClick={() => handleClick(i)}
                                        />
                                    </div>
                                ))}
                            </Slider >
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className='content'>
                            <div className='information'>
                                <h3>iPhone 14 Pro Max 128GB - Black</h3>
                                <span>Giá và khuyến mãi tại: Hồ Chí Minh</span>
                                <p>26.590.000đ</p>
                                <div className='promotion'>
                                    <h5>Khuyến mãi</h5>
                                    <span>Giá và khuyến mãi dự kiến áp dụng đến 23:00 | 31/07</span>
                                    <ul>
                                        <li>Thu cũ Đổi mới: Giảm đến 2 triệu (Tùy model máy cũ, không kèm các hình thức thanh toán online, mua kèm)<a> Xem chi tiết</a></li>
                                        <li>Vòng quay may mắn: Giảm thêm 100.000đ - 500.000đ (Chỉ áp dụng tại siêu thị; Không áp dụng kèm Thu cũ Đổi mới)<a> Xem chi tiết</a></li>
                                        <li>Hoàn tiền nếu ở đâu rẻ hơn (Trong vòng 7 ngày)<a> Xem chi tiết</a></li>
                                        <li>Nhập mã MMTGDD giảm tối đa 100.000đ khi thanh toán qua MOMO<a> Xem chi tiết</a></li>
                                    </ul>

                                </div>
                            </div>
                            <div className='buy'>
                                <div className='buy-now'>
                                    <Link to="#" className='link-buy-now'>
                                        <Button type='primary'>Mua ngay</Button>
                                    </Link>
                                </div>
                                <div className='installment'>
                                    <Link to="#" className='link-installment'>
                                        <Button type='primary'>Mua trả góp
                                            <p>Qua công ty tài chính</p>
                                        </Button>
                                    </Link>
                                    <Link to="#" className='link-installment'>
                                        <Button type='primary'>Trả góp qua thẻ
                                            <p>Visa, Mastercard, JCB, Amex</p>
                                        </Button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProductDetailComponent
