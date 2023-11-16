import React, { Fragment, useEffect, useState } from 'react';
import "./style.scss"
import { Link, useNavigate } from 'react-router-dom';
import { LeftOutlined } from "@ant-design/icons"
import { Col, Row, Image, InputNumber, Form, Input, Space, Button } from 'antd';
import { createNewOrder } from '../../../../apis/apiOrder';
import { updateCartItems } from '../../../../stores/actions/actionCart';
import store from '../../../../stores';
import { useSelector } from 'react-redux'


const CartComponent = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const cartItems = useSelector((state: any) => state.cartReducer.cartItems);

    const updateCart = (index: any, quantity: any) => {
        const updateListCart = [...cartItems]
        // updateListCart[index].quantity = quantity
        updateListCart[index] = {
            ...updateListCart[index], // Tạo bản sao mới của phần tử trong mảng
            quantity: quantity, // Thay đổi thuộc tính quantity của phần tử
        };
        localStorage.setItem('listCart', JSON.stringify(updateListCart))
        store.dispatch(updateCartItems(updateListCart))
    };

    const handleDelete = (index: any) => {
        const deleteListCart = [...cartItems];
        deleteListCart.splice(index, 1);
        localStorage.setItem('listCart', JSON.stringify(deleteListCart))
        store.dispatch(updateCartItems(deleteListCart))
    }


    let totalAmount = 0;
    let countProduct = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const price = item.price;
        const quantity = item.quantity;
        totalAmount += price * quantity;
        countProduct += item.quantity
    }

    const products = cartItems.map((el: any) => ({ product: el.name, quantity: el.quantity }))

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

        const response = await createNewOrder(dataForm)
        if (response.status === 200) {
            localStorage.removeItem('listCart');
            store.dispatch(updateCartItems([]))
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
                                {cartItems.map((el: any, index: any) => (
                                    <Fragment key={index}>
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
                                                <div>Số lượng:
                                                    <InputNumber
                                                        size='small'
                                                        min={1}
                                                        max={10}
                                                        value={el.quantity}
                                                        onChange={(quantity) => updateCart(index, quantity)}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <p>Giá sản phẩm</p>
                                                <p>{el.price.toLocaleString("en")}đ</p>
                                            </div>
                                        </Col>
                                    </Fragment>
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