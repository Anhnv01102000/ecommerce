import {
    ShoppingCartOutlined,
    DesktopOutlined,
    UserOutlined,
    MergeCellsOutlined
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";

function Dashboard() {
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
                        <Statistic title="Order" value="1234" />
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
                        <Statistic title="Category" value="1234" />
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
                        <Statistic title="User" value="1234" />
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
                        <Statistic title="Product" value="1234" />
                    </Space>
                </Card>
            </Space>
        </Space>
    );
}

export default Dashboard;