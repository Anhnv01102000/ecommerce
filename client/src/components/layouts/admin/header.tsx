import { Layout, Image, Space } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    return <Header style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', background: "#101010", color: "#fff" }}>
        <Image
            width={140}
            src="https://media.loveitopcdn.com/3807/logo-topzone-1.png"
            preview={false}
        />
        <Space style={{ fontSize: 18 }}>
            <UserOutlined style={{ fontSize: 24 }} />
            Logout
        </Space>
    </Header>
}

export default HeaderComponent;