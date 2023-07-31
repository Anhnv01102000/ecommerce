import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { register, getUser } from '../../../apis/apiUser';
import { useNavigate } from 'react-router-dom';


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const RegisterComponent: React.FC = () => {
    const navigate = useNavigate()

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        let res = await getUser()
        if (res.status === 200) {
            setData(res.data.users)
        }
    }

    const onFinish = async (values: any) => {
        const dataForm = {
            name: values.name,
            email: values.email,
            mobile: values.mobile,
            address: values.address,
            password: values.password,
        }

        if (data.find(el => el.email === values.email) || data.find(el => el.mobile === values.mobile)) {
            alert("Tài khoản đã tồn tại")
        } else {
            const response = await register(dataForm)
            console.log(response);
            if (response.status === 200) {
                navigate("/login")
            }
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
                <h2 style={{ textAlign: "center" }}>Đăng kí</h2>

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

                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Name' />
                </Form.Item>

                <Form.Item
                    name="address"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Address' />
                </Form.Item>

                <Form.Item
                    name="mobile"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Mobile' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Đăng kí
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterComponent;