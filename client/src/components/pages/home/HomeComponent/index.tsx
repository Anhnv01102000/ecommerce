import React, { useEffect, useState } from 'react';
import { Carousel, Image, Input } from 'antd';
import { AppleOutlined } from "@ant-design/icons"
import "./style.scss"
import BannerComponent from '../Banner';
import SliderComponent from '../SliderComponent';
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';


const { Search } = Input;


const HomeComponent = () => {
    const [product, setProduct] = useState<any[]>([])
    const [category, setCategory] = useState<any[]>([])

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        let res = await getProduct()
        if (res.status === 200) {
            setProduct(res.data.products)
        }
    }

    const fetchCategories = async () => {
        let res = await getCategory()
        if (res.status === 200) {
            setCategory(res.data.categories)
        }
    }

    const categoryIphone = category.find(el => el.name === "iPhone")?._id
    const productIphone = product.filter(el => el.category === categoryIphone)

    const categoryIpad = category.find(el => el.name === "iPad")?._id
    const productIpad = product.filter(el => el.category === categoryIpad)

    const categoryWatch = category.find(el => el.name === "Watch")?._id
    const productWatch = product.filter(el => el.category === categoryWatch)

    return (
        <>
            <Carousel autoplay dots={false} infinite speed={500} >
                <div>
                    <Image
                        src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/07/banner/GTN-2880-800-1920x533.png'
                        preview={false}
                    />
                </div>
                <div>
                    <Image
                        src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/06/banner/ip14-AW-S8-2880-800-min-1920x533-1.png'
                        preview={false}
                    />
                </div>
                <div>
                    <Image
                        src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/06/banner/2880-800-1920x533-2.png'
                        preview={false}
                    />
                </div>
                <div>
                    <Image
                        src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2023/07/banner/2880-800-1920x533.png'
                        preview={false}
                    />
                </div>
            </Carousel >

            <BannerComponent />

            <div>
                <div className='product-slider'>
                    <h2><AppleOutlined style={{ fontSize: "30px" }} /> iPhone</h2>
                    <SliderComponent data={productIphone} />
                </div >
                <div className='product-slider'>
                    <h2><AppleOutlined style={{ fontSize: "30px" }} /> iPad</h2>
                    <SliderComponent data={productIpad} />
                </div >
                <div className='product-slider'>
                    <h2><AppleOutlined style={{ fontSize: "30px" }} /> Watch</h2>
                    <SliderComponent data={productWatch} />
                </div >
            </div>

            <div className='newletter'>
                <h5>Đăng ký nhận tin từ TopZone</h5>
                <p>Thông tin sản phẩm mới nhất và chương trình khuyến mãi</p>
                <Search
                    className='search'
                    placeholder="Email của bạn"
                    allowClear
                    enterButton="Đăng kí"
                    size="middle"
                />
            </div>
        </>
    )
}

export default HomeComponent