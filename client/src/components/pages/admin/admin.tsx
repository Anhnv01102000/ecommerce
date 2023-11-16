import React, { useEffect } from "react";
import {
    ShoppingCartOutlined,
    DesktopOutlined,
    UserOutlined,
    MergeCellsOutlined
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { useSelector } from 'react-redux';
import store from "../../../stores";
import { getListOrder } from '../../../stores/actions/actionOrder';
import { getListCategory } from "../../../stores/actions/actionCategory";
import { getListProduct } from "../../../stores/actions/actionProduct";
import { getListUser } from "../../../stores/actions/actionUser";


const AdminComponent = () => {
    const order = useSelector((state: any) => state?.orderReducer?.orders)
    const category = useSelector((state: any) => state?.categoryReducer?.categories)
    const user = useSelector((state: any) => state.userReducer?.users)
    const product = useSelector((state: any) => state?.productReducer?.products)

    useEffect(() => {
        store.dispatch(getListOrder())
        store.dispatch(getListCategory())
        store.dispatch(getListProduct())
        store.dispatch(getListUser())
    }, [])
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={3}>Dashboard</Typography.Title>
            <Space direction="horizontal" size={40} align="center">
                <Card style={{ padding: "0 12px" }}>
                    <Space direction="horizontal">
                        <ShoppingCartOutlined
                            style={{
                                color: "green",
                                backgroundColor: "#00ff0040",
                                borderRadius: "50%",
                                fontSize: 32,
                                padding: 12
                            }}
                        />
                        <Statistic title="Order" value={order.length} style={{ textAlign: "center" }} />
                    </Space>
                </Card>
                <Card style={{ padding: "0 12px" }}>
                    <Space direction="horizontal">
                        <MergeCellsOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "#0000ff40",
                                borderRadius: "50%",
                                fontSize: 32,
                                padding: 12
                            }}
                        />
                        <Statistic title="Category" value={category.length} style={{ textAlign: "center" }} />
                    </Space>
                </Card>
                <Card style={{ padding: "0 12px" }}>
                    <Space direction="horizontal">
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "#00ffff40",
                                borderRadius: "50%",
                                fontSize: 32,
                                padding: 12
                            }}
                        />
                        <Statistic title="User" value={user.length} style={{ textAlign: "center" }} />
                    </Space>
                </Card>
                <Card style={{ padding: "0 12px" }}>
                    <Space direction="horizontal">
                        <DesktopOutlined
                            style={{
                                color: "red",
                                backgroundColor: "#ff000040",
                                borderRadius: "50%",
                                fontSize: 32,
                                padding: 12
                            }}
                        />
                        <Statistic title="Product" value={product.length} style={{ textAlign: "center" }} />
                    </Space>
                </Card>
            </Space>
        </Space>
    );
}

export default AdminComponent;