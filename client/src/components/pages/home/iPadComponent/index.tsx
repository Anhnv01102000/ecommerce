import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';

const IpadComponent = () => {
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

    const categoryIpad = category.find(el => el.name === "iPad")?._id
    const productIpad = product.filter(el => el.category === categoryIpad)

    return (
        <div className='main-content'>
            <h3>iPad</h3>
            <ListProductComponent data={productIpad} />
        </div>
    )
}

export default IpadComponent