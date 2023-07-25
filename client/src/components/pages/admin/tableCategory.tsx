import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Space, Table, Upload } from 'antd';
import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getCategory, createNewCategory, editCategory, deleteCategory } from '../../../apis/apiCategory';

const { Search } = Input;


enum STATUS {
    EDIT,
    CREATE
}

const TableCategory: React.FC = () => {
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
        }

        if (status === STATUS.CREATE) {
            const response = await createNewCategory(dataForm)
            if (response.status === 200) {
                fetchUser();
            }
        } else {
            const response = await editCategory(values._id, dataForm)
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
        let res = await getCategory()
        // console.log(res.data.categories);

        if (res.status === 200) {
            setData(res.data.categories)
        }
    }

    const { confirm } = Modal;

    const showConfirm = (record: any) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                const response = await deleteCategory(record._id)
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
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
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
                    Thêm danh mục
                </Button>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search by..."
                    enterButton
                    onSearch={setInput}
                />
            </div>
            <Modal title={status === STATUS.CREATE ? 'Thêm danh mục mới' : 'Cập nhật danh mục'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType={'primary'} footer={null}>
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
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
            />
        </>
    )
};

export default TableCategory;