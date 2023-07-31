import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';

const WatchComponent = () => {
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

    const categoryWatch = category.find(el => el.name === "Watch")?._id
    const productWatch = product.filter(el => el.category === categoryWatch)

    return (
        <div className='main-content'>
            <h3>Watch</h3>
            <ListProductComponent data={productWatch} />
        </div>
    )
}

export default WatchComponent