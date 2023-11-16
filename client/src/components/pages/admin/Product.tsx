import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Button, Form, Input, Modal, Space, Table, Upload, Select, Rate, UploadFile } from 'antd';
import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Image } from 'antd';
import { getProduct, createNewProduct, editProduct, deleteProduct } from '../../../apis/apiProduct';
import { getCategory } from '../../../apis/apiCategory';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import { useSelector } from "react-redux";
import store from '../../../stores';
import { getListProduct, createProduct, editProduct1, deleteProduct1 } from '../../../stores/actions/actionProduct';
import { getListCategory } from '../../../stores/actions/actionCategory';

enum STATUS {
    EDIT,
    CREATE
}

const normFile = (e: any) => {
    console.log('event: ', e.fileList);

    if (Array.isArray(e)) {
        return e;
    }
    console.log(e?.fileList.map((el: any) => el?.response?.files));
    return e?.fileList.flatMap((el: any) => el?.response?.files)
};


const TableProduct: React.FC = () => {
    interface DataType {
        key: React.Key;
        name: string;
        price: number;
        category: string;
        totalRatings: number;
    }

    const isLoading = useSelector((state: any) => state?.productReducer?.loading)
    const product: DataType[] = useSelector((state: any) => state?.productReducer?.products)
    const category = useSelector((state: any) => state?.categoryReducer?.categories)

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        store.dispatch(getListProduct())
        // let res = await getProduct()
        // console.log(res.data.products);
        // if (res.status === 200) {
        //     setProduct(res.data.products)
        // }
    }

    const fetchCategories = async () => {
        store.dispatch(getListCategory())
        // let res = await getCategory()
        // console.log(res.data.categories);
        // if (res.status === 200) {
        //     setCategory(res.data.categories)
        // }
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(STATUS.CREATE)
    const [description, setDescription] = useState('')

    const openCreateModal = () => {
        setIsModalOpen(true);
        setStatus(STATUS.CREATE);
        setDescription("")
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();

    // console.log(form.getFieldValue("images"));

    const getCategoryName = (categoryId: any) => {
        const findCategory = category.find((cat: any) => cat._id === categoryId);
        return findCategory ? findCategory.name : 'Unknown';
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
            align: "center"
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: "images",
            key: 'images',
            width: 120,
            align: "center",
            render: images => <Image src={images[0]} preview={true} />
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: "center",
            render: price => {
                return price.toLocaleString("en") + "đ";
            },
            sorter: (a, b) => a.price - b.price
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            align: "center",
            render: categoryId => getCategoryName(categoryId),
            filters:
                category.map(el => (
                    {
                        text: el.name,
                        value: el._id
                    }
                )),
            onFilter: (value: any, record: any) => (record.category.indexOf(value) === 0),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'totalRatings',
            key: 'totalRatings',
            align: "center",
            render: totalRatings => (<Rate allowHalf value={totalRatings} disabled style={{ fontSize: "15px" }} />)
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: "center",
            render: createdAt => (new Date(createdAt).toLocaleDateString("en-GB")),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 180,
            align: "center",
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
        if (input === '') return product
        return product.filter(({ name }) => name.toLowerCase().includes(input.toLowerCase()))
    }

    const onFinish = async (values: any) => {
        const images = await values?.dataImage

        const dataForm = {
            name: values.name,
            price: values.price,
            description: description,
            category: values.category,
            images: images
        }

        console.log(dataForm);

        if (status === STATUS.CREATE) {
            // const response = await createNewProduct(dataForm)
            // console.log(response);
            // if (response.status === 200) {
            //     fetchProducts();
            // }
            store.dispatch(createProduct(dataForm))
        } else {
            // const response = await editProduct(values._id, dataForm)
            // if (response.status === 200) {
            //     fetchProducts();
            // }
            store.dispatch(editProduct1(values._id, dataForm))
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };


    const handleEditRow = (record: any) => {
        // console.log(record);
        setStatus(STATUS.EDIT);
        // record.images = record.images.map(
        //     (el, index) => ({
        //         uid: index,
        //         name: el,
        //         status: 'done',
        //         url: el,
        //     })
        // )
        // console.log(record);
        setDescription(record.description);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    }


    const { confirm } = Modal;

    const showConfirm = (record: any) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                // const response = await deleteProduct(record._id)
                // if (response.status === 200) {
                //     fetchProducts();
                // }
                store.dispatch(deleteProduct1(record._id))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

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
                                <Select.Option key={el._id} value={el._id}>{el.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả sản phẩm" rules={[{ required: true }]}>
                        {/* <Input /> */}
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="dataImage"
                        label="Ảnh sản phẩm"
                        valuePropName="images"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            action="http://localhost:8888/api/product/uploadimage"
                            name='images'
                            listType="picture-card"
                            multiple
                        // fileList={form.getFieldValue("images")}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item >
                        <Space size={'small'}>
                            <Button
                                onClick={() => setIsModalOpen(false)}
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                            >
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
                rowKey={"_id"}
                columns={columns}
                dataSource={filterData()}
                scroll={{ x: 1000 }}
                bordered
                pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['3', '5', '10'] }}
                loading={isLoading}
            />
        </>
    )
};

export default TableProduct;