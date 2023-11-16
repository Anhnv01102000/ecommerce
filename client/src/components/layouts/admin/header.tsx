import { Layout, Image, Space, Button } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons'
import { logout } from '../../../apis/apiUser';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        const getRefreshToken = localStorage.getItem("refresh-token");
        console.log(getRefreshToken);

        const dataForm = {
            refreshToken: getRefreshToken
        }
        const response = await logout(dataForm)
        if (response.status === 200) {
            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");
            navigate("/login")
        }
    }
    return (
        <Header style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', background: "#101010", color: "#fff" }}>
            <Image
                width={140}
                src="https://media.loveitopcdn.com/3807/logo-topzone-1.png"
                preview={false}
            />
            <Space style={{ fontSize: 18 }}>
                <Button onClick={handleLogout} style={{ background: "none", border: "none", color: "#fff" }}>
                    <UserOutlined style={{ fontSize: 24 }} />
                    Logout
                </Button>
            </Space>
        </Header>
    )

}

export default HeaderComponent;