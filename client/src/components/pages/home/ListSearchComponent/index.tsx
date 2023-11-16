import React, { useEffect, useState } from 'react';
import ListProductComponent from "../ListProductComponent"
import "./style.scss"

const ListSearchComponent = ({ searchData }) => {
    return (
        <div className='main-content'>
            {
                searchData.length
                    ?
                    <>
                        <h3>Kết quả tìm kiếm</h3>
                        <ListProductComponent data={searchData} />
                    </>
                    :
                    <div
                        className='not-found'
                    >
                        Không tìm thấy kết quả nào phù hợp
                    </div>
            }
        </div>
    )
}

export default ListSearchComponent