import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';

const AccessoryComponent = () => {
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

    const categoryAccessory = category.find(el => el.name === "Phụ kiện")?._id
    const productAccessory = product.filter(el => el.category === categoryAccessory)

    return (
        <div className='main-content'>
            <h3>Phụ kiện</h3>
            <ListProductComponent data={productAccessory} />
        </div>
    )
}

export default AccessoryComponent