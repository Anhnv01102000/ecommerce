import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Select } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getUser } from '../../../apis/apiUser';
import store from '../../../stores';
import { getListUser } from '../../../stores/actions/actionUser';
import { useSelector } from 'react-redux';

const TableUser: React.FC = () => {
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const user = useSelector((state: any) => state?.userReducer?.users)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        // let res = await getUser()
        // if (res.status === 200) {
        //     setData(res.data.users)
        // }
        store.dispatch(getListUser())
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'Name',
            fixed: 'left',
            width: 150,
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 220,
            align: 'center',
        },
        // {
        //     title: 'Password',
        //     dataIndex: 'password',
        //     key: 'password',
        //     width: 100,
        // },
        {
            title: 'SĐT',
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'center',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: createdAt => (new Date(createdAt).toLocaleDateString("en-GB")),
        },
    ];

    // Search

    const [input, setInput] = useState('')
    const filterData = () => {
        if (input === '') return user
        return user.filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()))
    }

    return (
        <>
            <div style={{ margin: "24px 0", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search by..."
                    enterButton
                    onSearch={setInput}
                />
            </div>

            <Table
                rowKey={"_id"}
                columns={columns}
                dataSource={filterData()}
                bordered
                pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
            />
        </>
    )
};

export default TableUser;