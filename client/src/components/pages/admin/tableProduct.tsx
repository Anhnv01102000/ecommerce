import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Space, Table, Upload, Select } from 'antd';
import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Image } from 'antd';
import { getProduct, createNewProduct, editProduct, deleteProduct, uploadImage } from '../../../apis/apiProduct';
import { getCategory } from '../../../apis/apiCategory';

enum STATUS {
    EDIT,
    CREATE
}

const normFile = (e: any) => {
    console.log('event: ', e);

    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const TableProduct: React.FC = () => {
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const [data, setData] = useState<DataType[]>([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        let res = await getProduct()
        console.log(res.data.products);

        if (res.status === 200) {
            setData(res.data.products)
        }
    }

    const fetchCategories = async () => {
        let res = await getCategory()
        // console.log(res.data.categories);

        if (res.status === 200) {
            setCategory(res.data.categories)
        }
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
        // values.images.map
        const images = await values.images
        console.log(values.images);

        const dataForm = {
            name: values.name,
            price: values.price,
            description: values.description,
            category: values.category,
            images: values.images.originFileObj
        }

        if (status === STATUS.CREATE) {
            const response = await createNewProduct(dataForm)
            console.log(response);
            if (response.status === 200) {
                fetchProducts();
            }
        } else {
            const response = await editProduct(values._id, dataForm)
            if (response.status === 200) {
                fetchProducts();
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    const { confirm } = Modal;

    const showConfirm = (record: any) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                const response = await deleteProduct(record._id)
                if (response.status === 200) {
                    fetchProducts();
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
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: "images",
            render: images => <Image src={images[0]} preview={true} />,
            key: 'images',
            width: 120
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: price => {
                return price.toLocaleString("en") + "đ";
            }
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
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
            <div
                style={{ margin: "24px 0", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="primary" onClick={openCreateModal}>
                    Thêm sản phẩm
                </Button>
                <Input.Search
                    style={{ width: 300 }}
                    placeholder="Search by..."
                    enterButton
                    onSearch={setInput}
                />
            </div>
            <Modal title={status === STATUS.CREATE ? 'Thêm sản phẩm mới' : 'Cập nhật sản phẩm'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType={'primary'} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {
                        !(status === STATUS.CREATE) && (
                            <Form.Item
                                label="ID"
                                name="_id"
                                rules={[{ required: true, message: 'Please input your account ID!' }]}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        )
                    }
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Giá sản phẩm" rules={[{ required: true }]}>
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Select placeholder="Please select a category">
                            {category.map((el: any) => (
                                <Select.Option value={el._id}>{el.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="form-images" label="form-images" valuePropName="images" getValueFromEvent={normFile}>
                        <Upload
                            name='images'
                            action={`http://localhost:8888/api/product/uploadimage`}
                            listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
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
                pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
            />
        </>
    )
};

export default TableProduct;