import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';

const IPhoneComponent = () => {
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

    return (
        <div className='main-content'>
            <h3>iPhone</h3>
            <ListProductComponent data={productIphone} />
        </div>
    )
}

export default IPhoneComponent