import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Select } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getUser, createNewUser, editUser, deleteUser } from '../../../apis/apiUser';

enum STATUS {
    EDIT,
    CREATE
}

const TableUser: React.FC = () => {
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(STATUS.CREATE)

    const openCreateModal = () => {
        setIsModalOpen(true);
        setStatus(STATUS.CREATE);
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();

    const handleEditRow = (record: any) => {
        setStatus(STATUS.EDIT);
        console.log(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    }

    const onFinish = async (values: any) => {
        console.log(values);

        const dataForm = {
            name: values.name,
            email: values.email,
            mobile: values.mobile,
            address: values.address,
            password: values.password,
            role: values.role
        }

        if (status === STATUS.CREATE) {
            const response = await createNewUser(dataForm)
            if (response.status === 200) {
                fetchUser();
            }
        } else {
            const response = await editUser(values._id, dataForm)
            if (response.status === 200) {
                fetchUser();
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

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
        // {
        //     title: 'ID',
        //     dataIndex: '_id',
        //     key: '_id',
        //     width: 160,
        //     fixed: 'left',
        // },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'Name',
            fixed: 'left',
            width: 150
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 220
        },
        // {
        //     title: 'Password',
        //     dataIndex: 'password',
        //     key: 'password',
        //     width: 100,
        // },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 100,
        },
        {
            title: 'SĐT',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 180,
            render: (_, record) => (
                <Space size={'large'}>
                    <Button onClick={() => handleEditRow(record)}>Edit</Button>
                    <Button type="primary" onClick={() => showConfirm(record)} danger>Delete</Button>
                </Space>
            ),
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
                <Button type="primary" onClick={openCreateModal}>
                    Thêm người dùng
                </Button>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search by..."
                    enterButton
                    onSearch={setInput}
                />
            </div>
            <Modal title={status === STATUS.CREATE ? 'Thêm người dùng mới' : 'Cập nhật người dùng'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType={'primary'} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name="_id" label="ID sản phẩm">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Role">
                        <Select placeholder="Please select a role">
                            <Select.Option value="User">User</Select.Option>
                            <Select.Option value="Admin">Admin</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="mobile" label="SĐT" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Space size={'small'}>
                            <Button onClick={() => setIsModalOpen(false)} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="primary" htmlType="button" onClick={onReset} danger>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal >
            <Table
                columns={columns}
                dataSource={filterData()}
                scroll={{ x: 1000 }}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
            />
        </>
    )
};

export default TableUser;