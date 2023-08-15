import React, { useEffect, useState } from 'react';
import "./style.scss"
import { Link, useNavigate } from 'react-router-dom';
import { LeftOutlined } from "@ant-design/icons"
import { Col, Row, Image, InputNumber, Form, Input, Space, Button } from 'antd';
import { createOrder } from '../../../../apis/apiOrder';


const CartComponent = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [listCart, setListCart] = useState<any>([])

    let cart: any = localStorage.getItem('listCart')

    const fetchCart = () => {
        if (cart !== null) {
            setListCart(JSON.parse(cart))
        } else {
            setListCart([])
        }
    }

    useEffect(() => {
        fetchCart()
    }, [cart])

    // console.log(listCart);

    const updateCart = (index: any, value: any) => {
        const updateListCart = [...listCart]
        updateListCart[index].quantity = value
        setListCart(updateListCart)
        localStorage.setItem('listCart', JSON.stringify(updateListCart))
    };

    const handleDelete = (index: any) => {
        const deleteListCart = [...listCart];
        deleteListCart.splice(index, 1);
        setListCart(deleteListCart);
        localStorage.setItem('listCart', JSON.stringify(deleteListCart))
    }


    let totalAmount = 0;
    let countProduct = 0;
    for (var i = 0; i < listCart.length; i++) {
        var item = listCart[i];
        var price = item.price;
        var quantity = item.quantity;
        totalAmount += price * quantity;
        countProduct += item.quantity
    }

    const products = listCart.map((el: any) => ({ product: el.name, quantity: el.quantity }))

    const onFinish = async (values: any) => {
        const orderBy = [
            {
                name: values.name,
                phone: values.phone,
                address: values.address
            }
        ]
        const dataForm = {
            products: products,
            total: totalAmount,
            orderBy: orderBy
        }

        const response = await createOrder(dataForm)
        if (response.status === 200) {
            localStorage.removeItem('listCart');
            navigate("/success")
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (countProduct > 0) {
        return (
            <div className='cart'>
                <div className='cart-content'>
                    <div className='content-detail'>
                        <Link className='top-content' to="/"><LeftOutlined /> Mua thêm sản phẩm khác</Link>
                        <div className='middle-content'>
                            <Row className='cart-item' gutter={[32, 32]}>
                                {listCart.map((el: any, index: any) => (
                                    <>
                                        <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                                            <Button
                                                size='small'
                                                onClick={() => handleDelete(index)}
                                            >
                                                Xóa
                                            </Button>
                                        </Col>
                                        <Col span={4}>
                                            <Image
                                                src={el.images[0]}
                                                preview={false}
                                            />
                                        </Col>
                                        <Col span={18} style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>
                                                <p>{el.name}</p>
                                                <p>Số lượng:
                                                    <InputNumber
                                                        size='small'
                                                        min={1}
                                                        max={10}
                                                        defaultValue={el.quantity}
                                                        onChange={(value) => updateCart(index, value)} />
                                                </p>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <p>Giá sản phẩm</p>
                                                <p>{el.price.toLocaleString("en")}đ</p>
                                            </div>
                                        </Col>
                                    </>
                                ))}
                                <Col span={18} style={{ textAlign: "center" }}>
                                    <p>Tạm tính ({countProduct} sản phẩm): </p>
                                </Col>
                                <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <div style={{ padding: "0 6px" }}>
                                        <p>{totalAmount.toLocaleString("en")}đ</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className='customer-info'>
                    <div className='customer-detail'>
                        <p>Thông tin khách hàng</p>
                        <br></br>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input placeholder='Please input your name!' />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <Input type='number' placeholder='Please input your phone!' />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input placeholder='Please input your address!' />
                            </Form.Item>
                            <Form.Item
                                style={{ display: "flex", justifyContent: "center" }}
                            >
                                <Space size={'large'}>
                                    <Button type="primary" htmlType="submit">
                                        Đặt hàng
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='cart'>
                <Image
                    src='https://bizweb.dktcdn.net/100/320/202/themes/714916/assets/empty-cart.png?1650292912948'
                    preview={false}
                />
            </div>
        )
    }
}

export default CartComponent