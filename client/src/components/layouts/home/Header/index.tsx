import React, { useEffect, useState } from 'react';
import { Menu, Input, Button, Image } from 'antd';
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';
import { useNavigate } from "react-router-dom";


const { SubMenu } = Menu;

const { Search } = Input

const HomeHeaderComponent = () => {

    const [data, setData] = useState([])
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

    const navigate = useNavigate();

    return (
        <div>
            <header className="header">
                <div className="header-top">
                    <Link className='logo' to="/">
                        <Image
                            width={120}
                            src="https://media.loveitopcdn.com/3807/logo-topzone-1.png"
                            preview={false}
                        />
                    </Link>
                    <div className="search">
                        <Input
                            placeholder="Bạn đang tìm kiếm sản phẩm ..."
                            allowClear
                            prefix={<SearchOutlined />}
                            size="middle"
                            style={{ border: "none", color: "#939ca3", outlineOffset: "none" }}
                        />
                    </div>
                    <div className='icon'>
                        <UserOutlined style={{ fontSize: 24, margin: "0 30px 0 0" }} />
                        <ShoppingCartOutlined style={{ fontSize: 30 }} />
                    </div>
                </div>
                <Menu theme='dark' className='menu' mode="horizontal">
                    {
                        category.map((el: any) => {
                            return (
                                <Menu.Item
                                    className='menu-item'
                                    key={`/${el.name}`}
                                    onClick={
                                        (el) => {
                                            navigate(el.key.toLowerCase()
                                                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // Xóa dấu
                                                .replace(/\s/g, ''));  // bỏ khoảng cách
                                        }}
                                >
                                    {el.name}
                                </Menu.Item>
                            )
                        })
                    }

                </Menu>
            </header>
        </div>
    );
}

export default HomeHeaderComponent;
