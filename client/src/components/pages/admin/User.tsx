import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Select } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getUser, deleteUser } from '../../../apis/apiUser';

const TableUser: React.FC = () => {
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const [data, setData] = useState<DataType[]>([])

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        let res = await getUser()
        console.log(res.data.users);

        if (res.status === 200) {
            setData(res.data.users)
        }
    }

    const { confirm } = Modal;

    const showConfirm = (record: any) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                const response = await deleteUser(record._id)
                if (response.status === 200) {
                    fetchUser();
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

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
        },
    ];

    // Search

    const [input, setInput] = useState('')
    const filterData = () => {
        if (input === '') return data
        return data.filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()))
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
                columns={columns}
                dataSource={filterData()}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
            />
        </>
    )
};

export default TableUser;