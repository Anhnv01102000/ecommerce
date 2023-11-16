import React, { useState, useEffect, ReactNode } from 'react';
import {
    DesktopOutlined,
    ShoppingCartOutlined,
    PieChartOutlined,
    MergeCellsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '/admin', <PieChartOutlined />),
    getItem('User', '/admin/user', <UserOutlined />),
    getItem('Product', '/admin/product', <DesktopOutlined />),
    getItem('Category', '/admin/category', <MergeCellsOutlined />),
    getItem('Order', '/admin/order', <ShoppingCartOutlined />),
];

const ContentComponent = ({ children }: { children: ReactNode }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { pathname } = useLocation();
    // console.log(pathname);

    const [selectedKeys, setSelectedKeys] = useState("/");

    useEffect(() => {
        setSelectedKeys(pathname);
    }, [pathname]);

    const navigate = useNavigate();

    const listBreadcrumb = pathname.split('/').filter(el => el)
    console.log(listBreadcrumb);


    return (
        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}
                    items={listBreadcrumb?.map(el => ({ title: el.charAt(0).toUpperCase() + el.slice(1) }))}
                />
                {/* {
                        listBreadcrumb?.map((el, index, array) => (
                            el.length ? <Breadcrumb.Item key={index}>{el.charAt(0).toUpperCase() + el.slice(1)}</Breadcrumb.Item> : null
                        ))
                    }
                </Breadcrumb> */}

                <Layout style={{ background: colorBgContainer }}>
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            onClick={(items) => { navigate(items.key); }}
                            // theme="dark"
                            selectedKeys={[selectedKeys]}
                            mode="inline"
                            items={items}
                            style={{ padding: "30px 0", minHeight: "100vh" }}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default ContentComponent;