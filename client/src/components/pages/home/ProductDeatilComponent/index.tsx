import React, { useState, useEffect } from 'react';
import { Col, Row, Image, Button, Form, Input, Rate, Avatar } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProduct, ratings } from '../../../../apis/apiProduct';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import store from '../../../../stores';
import { updateCartItems } from '../../../../stores/actions/actionCart';

const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
};

const ProductDetailComponent = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<any>([])
    const [images, setImages] = useState<any[]>([])
    const [previewImage, setPreviewImage] = useState()
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        let res = await getProduct()
        if (res.status === 200) {
            setProduct(res.data.products)
        }
        // console.log(res.data.products);
        res.data.products.map((el: any) => {
            if (el._id == id) {
                setImages(el.images)
                setPreviewImage((el.images)[0])
            }
        })
    }

    const filterData = product.filter((el: any) => el._id == id)
    // console.log(filterData);

    // const totalRatings = filterData.flatMap((el: any) => el.totalRatings)
    const totalRatings = product.find((el: any) => el._id == id)?.totalRatings

    const handleClick = (i: any) => {
        setPreviewImage(images[i])
    }

    const dataRatings = filterData.flatMap((el: any) => el.ratings)

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const dataForm = {
            pid: id,
            postedBy: values.name,
            comment: values.comment,
            star: values.star
        }
        const response = await ratings(dataForm)
        if (response.status === 200) {
            fetchProducts();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    let listCartLocalStorage: any = localStorage.getItem('listCart')

    if (listCartLocalStorage !== null) {
        listCartLocalStorage = JSON.parse(listCartLocalStorage)
    } else {
        listCartLocalStorage = []
    }
    // console.log(listCartLocalStorage);


    const [listCart, setListCart] = useState<any[]>(listCartLocalStorage)

    const handleAddCart = (el: any) => {
        console.log(typeof (listCart));
        const quantity = 1
        el = { ...el, quantity }
        const recordCart = listCart.filter((record) => record._id === el._id);
        // console.log(recordCart.length);
        if (recordCart.length) { // 0(else): add new // other: edit
            // true
            const newList = listCart.map((record) => {
                if (record._id === el._id) {
                    return {
                        ...el,
                        quantity: record.quantity + 1
                    };
                }
                return record;
            })
            localStorage.setItem('listCart', JSON.stringify(newList))
            setListCart(newList);
            alert("Thêm vào giỏ hàng thành công!")
            store.dispatch(updateCartItems(newList))
        } else {
            // false
            const newList = [...listCart, el];
            localStorage.setItem('listCart', JSON.stringify(newList))
            setListCart(newList);
            alert("Thêm vào giỏ hàng thành công!")
            store.dispatch(updateCartItems(newList))
        }
    }

    const customSetting = {
        ...settings,
        slidesToShow: images.length > 3 ? 4 : images.length
    }

    return (
        <div className="product-detail">
            <div className="detail">
                <Row>
                    <Col xs={24} lg={12}>
                        <div className='slider-image'>
                            <div className='image-preview'>
                                <img src={previewImage} />
                            </div>
                            <Slider {...customSetting}>
                                {images.map((el, index) => (
                                    <div key={index} className='slider-item'>
                                        <Image
                                            className='image'
                                            src={el}
                                            preview={false}
                                            onClick={() => handleClick(index)}
                                        />
                                    </div>
                                ))}
                            </Slider >
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        {filterData.map((el: any) => {
                            return (
                                <div key={el._id} className='content'>
                                    <div className='information'>
                                        <h3>{el.name}</h3>
                                        <span>Giá và khuyến mãi tại: Hồ Chí Minh</span>
                                        <p>{el.price.toLocaleString("en")}đ</p>
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
                                            <Button type='primary' onClick={() => handleAddCart(el)}>Mua ngay</Button>
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
                            )
                        })}

                    </Col>
                </Row>
            </div>

            <div className='description'>
                {filterData.map((el: any) => (
                    <div key={el._id} dangerouslySetInnerHTML={{ __html: el.description }} />
                ))}
            </div>

            <div className='review'>
                <h2>Đánh giá sản phẩm</h2>
                <Row>
                    <Col className='review-content' xs={24} lg={8}>
                        <div className='total-rating'>
                            <p>{totalRatings} <StarFilled style={{ color: "#FEB700" }} /></p>
                            <span>{dataRatings.length} đánh giá</span>
                        </div>
                        <p>Viết đánh giá của riêng bạn</p>
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            style={{ paddingRight: "20px" }}
                            initialValues={{
                                star: 5
                            }}
                        >
                            <Form.Item
                                label="Chất lượng"
                                name="star"
                                rules={[{ required: true, message: 'Please input your star!' }]}
                            >
                                <Rate
                                    allowHalf
                                />
                            </Form.Item>
                            <Form.Item
                                label="Tên của bạn"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input width={"80%"} />
                            </Form.Item>
                            <Form.Item
                                label="Đánh giá về sản phẩm"
                                name="comment"
                                rules={[{ required: true, message: 'Please input your comment!' }]}
                            >
                                <TextArea allowClear />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    Gửi đánh giá
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col className='list-review' xs={24} lg={16}>
                        {dataRatings.map((el: any) => {
                            return (
                                <div key={el._id} className='review-item'>
                                    <div className='item-infor'>
                                        <Avatar size={32} icon={<UserOutlined />} />
                                        <p>{el.postedBy}</p>
                                    </div>
                                    <Rate disabled allowHalf value={el.star} style={{ fontSize: "14px" }} />
                                    <p>{el.comment}</p>
                                </div>
                            )
                        })}


                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProductDetailComponent
