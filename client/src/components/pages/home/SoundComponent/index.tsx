import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import "./style.scss"
import { getProduct } from '../../../../apis/apiProduct';
import { getCategory } from '../../../../apis/apiCategory';

const SoundComponent = () => {
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

    const categorySound = category.find(el => el.name === "Âm thanh")?._id
    const productSound = product.filter(el => el.category === categorySound)

    return (
        <div className='main-content'>
            <h3>Âm thanh</h3>
            <ListProductComponent data={productSound} />
        </div>
    )
}

export default SoundComponent