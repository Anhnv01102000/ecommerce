import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { getUser, login } from '../../../apis/apiUser';
import { Link, useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const LoginComponent: React.FC = () => {
    const navigate = useNavigate()

    const onFinish = async (values: any) => {
        const dataForm = {
            email: values.email,
            password: values.password,
        }
        const response = await login(dataForm)

        if (response.status === 200) {
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            localStorage.setItem("access-token", accessToken);
            localStorage.setItem("refresh-token", refreshToken);
            alert("Đăng nhập thành công");
            navigate('/admin');
        } else {
            alert("Email hoặc mật khẩu không đúng")
        }
    };

    return (
        <div style={
            {
                display: 'flex', alignItems: "center", justifyContent: "center",
                backgroundImage: `url("https://anhdep123.com/wp-content/uploads/2020/04/wallpaper-n%C3%BAi-r%E1%BB%ABng.jpg")`,
                height: "100vh"
            }}>
            <Form
                name="basic"
                style={{ maxWidth: 600, padding: "30px", backgroundColor: "#fff", borderRadius: "20px" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
                <Form.Item
                    style={{ width: 300 }}
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>

                <p style={{ textAlign: "center" }}>
                    <Link to="/" >
                        Quên mật khẩu
                    </Link>
                </p>

                <hr></hr>
                <br></br>
                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button
                        type='primary'
                        onClick={() => { navigate("/register") }}
                        style={{ backgroundColor: "#42b72a" }}
                    >
                        Tạo tài khoản mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default LoginComponent;