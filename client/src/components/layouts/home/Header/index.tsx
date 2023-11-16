import React, { useEffect, useState } from 'react';
import { Menu, Input, Button, Image } from 'antd';
import { SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';
import { useNavigate } from "react-router-dom";
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux';
import store from '../../../../stores';
import { getCartItemsFromLocalStorage } from '../../../../stores/actions/actionCart';
import { getListProduct } from '../../../../stores/actions/actionProduct';
import { getListCategory } from '../../../../stores/actions/actionCategory';

const { SubMenu } = Menu;

const { Search } = Input

const HomeHeaderComponent = () => {
    const cartItems: any = useSelector((state: any) => state?.cartReducer?.cartItems);
    // const cartItems = dataRedux
    // console.log(cartItems);

    const countProduct = cartItems.reduce((total, item) => total + item.quantity, 0);

    const category = useSelector((state: any) => state?.categoryReducer?.categories)
    const product = useSelector((state: any) => state?.productReducer?.products)

    useEffect(() => {
        store.dispatch(getCartItemsFromLocalStorage())
        fetchCategories()
        fetchProducts()
    }, [])

    const fetchCategories = async () => {
        store.dispatch(getListCategory())
    }

    const fetchProducts = async () => {
        store.dispatch(getListProduct())
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

    // Search
    const [input, setInput] = useState('')
    const search = () => {
        const searchData = product.filter((el) => el.name.toLowerCase().includes(input.toLowerCase()))
        navigate('/search', { state: { searchData } });  // Truyền searchData sang state của page search
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
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={(e) => search()}
                        />
                    </div>
                    <div className='icon'>
                        <ShoppingCartOutlined onClick={() => { navigate("/cart") }} style={{ fontSize: 28, margin: "0 30px 0 0" }} />
                        <span className='count-product'>
                            {countProduct}
                        </span>
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
