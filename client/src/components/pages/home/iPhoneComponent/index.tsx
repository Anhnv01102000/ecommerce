import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import { Link } from 'react-router-dom';
import { Col, Row, Image } from 'antd';
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';

const IPhoneComponent = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        let res = await getProduct()
        if (res.status === 200) {
            setData(res.data.products)
        }
    }

    const fetchCategories = async () => {
        let res = await getCategory()
        if (res.status === 200) {
            setCategory(res.data.categories)
        }

    }

    console.log(data);
    console.log(category);


    return (
        <div className='main-content'>
            <h3>iPhone</h3>
            {/* <ListProductComponent data={data} /> */}
            <Row>
                {data.map((el: any) => (
                    <Col xs={12} lg={6} >
                        <Link className='link' to="/">
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src={el.images[0]}
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default IPhoneComponent