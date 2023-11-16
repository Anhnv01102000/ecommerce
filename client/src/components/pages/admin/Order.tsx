import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { getOrder } from '../../../apis/apiOrder';
import { Table, Input } from 'antd';
import { useSelector } from 'react-redux';
import store from '../../../stores';
import { getListOrder } from '../../../stores/actions/actionOrder';

const OrderTable = () => {
    interface DataType {
        key: React.Key;
        total: number;
        products: any[];
        orderBy: any[];
    }
    const order = useSelector((state: any) => state?.orderReducer?.orders)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        // let res = await getOrder()

        // if (res.status === 200) {
        //     setOrder(res.data.order)
        // }
        store.dispatch(getListOrder())
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Order By',
            dataIndex: 'orderBy',
            key: 'orderBy',
            align: 'center',
            render: orderBy => (
                <ul>
                    {orderBy.map((item: any, index: any) => (
                        <li key={index} style={{ listStyle: "none" }}>
                            {item.name} (SĐT: {item.phone} - Địa chỉ: {item.address})
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Chi tiết đơn hàng',
            dataIndex: 'products',
            key: 'products',
            align: 'center',
            render: products => (
                <ul>
                    {products.map((item: any, index: any) => (
                        <li key={index} style={{ listStyle: "none" }}>
                            {item.product} (Số lượng: {item.quantity})
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
            render: total => (total.toLocaleString("en") + "đ")
        },
    ];

    const [input, setInput] = useState('')
    const filterData = () => {
        if (input === '') return order
        // return order.filter(
        //     ({ products }) => products.map((el: any) => el.product.toLowerCase().includes(input.toLowerCase()))
        // )
    }

    return (
        <>
            <div
                style={{ margin: "24px 0", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search by..."
                    enterButton
                    onSearch={setInput}
                />
            </div>
            <Table
                rowKey={"_id"}
                dataSource={order}
                columns={columns}
                bordered
                pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
            />
        </>
    )
};

export default OrderTable;
