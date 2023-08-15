import React, { useEffect, useState } from 'react';
import { Menu, Input, Button, Image } from 'antd';
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';
import { useNavigate } from "react-router-dom";
import type { MenuProps } from 'antd';


const { SubMenu } = Menu;

const { Search } = Input

const HomeHeaderComponent = () => {
    const [data, setData] = useState<any[]>([])
    const [category, setCategory] = useState<any[]>([])

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        let res = await getProduct()
        // console.log(res.data.products);

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

    const items: MenuProps['items'] =
        // [
        //     {
        //         label: "iPhone",
        //         key: "/iphone"
        //     },
        //     {
        //         label: "Mac",
        //         key: "/mac"
        //     },
        //     {
        //         label: "iPad",
        //         key: "/ipad"
        //     },
        //     {
        //         label: "Watch",
        //         key: "/watch"
        //     },
        //     {
        //         label: "Âm thanh",
        //         key: "/amthanh"
        //     },
        //     {
        //         label: "Phụ kiện",
        //         key: "/phukien"
        //     },
        //     {
        //         label: "TopCare",
        //         key: "/topcare"
        //     }
        // ]


        category.map(
            el => (
                {
                    label: el.name,
                    key: `/${el.name.toLowerCase()
                        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // Xóa dấu
                        .replace(/\s/g, '')}`  // bỏ khoảng cách
                }
            )
        )

    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    // console.log(selectedKeys);

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    };

    let listCartLocalStorage: any = localStorage.getItem('listCart')

    if (listCartLocalStorage !== null) {
        listCartLocalStorage = JSON.parse(listCartLocalStorage)
    } else {
        listCartLocalStorage = []
    }

    const [listCart, setListCart] = useState<any[]>(listCartLocalStorage)

    let countProduct = 0;
    for (var i = 0; i < listCart.length; i++) {
        var item = listCart[i];
        countProduct += item.quantity
    }
    return (
        <div>
            <header className="header">
                <div className="header-top">
                    <Link className='logo' to="/">
                        <Image
                            width={120}
                            src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_570x207/https://cdn.tgdd.vn/mwgcart/topzone/images/logo-video.png?v=4"
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
                        <ShoppingCartOutlined onClick={() => { navigate("/cart") }} style={{ fontSize: 28, margin: "0 30px 0 0" }} />
                        <span className='count-product'>{countProduct}</span>
                        <UserOutlined style={{ fontSize: 24 }} />
                    </div>
                </div>
                <Menu
                    theme='dark'
                    className='menu'
                    mode="horizontal"
                    items={items}
                    onClick={onClick}
                    selectedKeys={[selectedKeys]}
                >
                    {/* {
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
                    } */}
                </Menu>
            </header>
        </div>
    );
}

export default HomeHeaderComponent;
