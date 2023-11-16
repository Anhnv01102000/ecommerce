import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import "./style.scss"


const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
};

interface ChildProps {
    data: any[];
}

const SliderComponent: React.FC<ChildProps> = ({ data }) => {
    // console.log(data);
    return (
        <Slider {...settings}>
            {data.map(el => (
                <div key={el._id} className='product-card'>
                    <div className='card-item'>
                        <Link className='link' to={`/product/${el._id}`}>
                            <Image
                                className='image'
                                src={el.images[0]}
                                preview={false}
                            />
                            <div>
                                <p className='name'>{el.name}</p>
                                <div className='price'>
                                    <span>{el.price.toLocaleString("en")}đ</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </Slider >
    )
}
export default SliderComponent