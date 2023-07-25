import { Carousel, Image } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { AppleOutlined } from "@ant-design/icons"
import "./style.scss"

// import { getProduct } from '../../../../apis/apiProduct';
// import { getCategory } from '../../../../apis/apiCategory';

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
                initialSlide: 2
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


const HomeComponent = () => {
    return (
        <>
            <Carousel autoplay dots={false} >
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

            <div className='product-slider'>
                <h2><AppleOutlined style={{ fontSize: "30px" }} /> iPhone</h2>
                <Slider {...settings}>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Slider >
            </div >
            <div className='product-slider'>
                <h2><AppleOutlined style={{ fontSize: "30px" }} /> Mac</h2>
                <Slider {...settings}>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Slider >
            </div >
            <div className='product-slider'>
                <h2><AppleOutlined style={{ fontSize: "30px" }} /> iPad</h2>
                <Slider {...settings}>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Slider >
            </div >
            <div className='product-slider'>
                <h2><AppleOutlined style={{ fontSize: "30px" }} /> Watch</h2>
                <Slider {...settings}>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link className='link' to="/">
                        <div className='product-card'>
                            <div className='card-item'>
                                <Image
                                    className='image'
                                    src='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/251192/s16/iphone-14-pro-max-black-thumbtz-650x650.png'
                                    preview={false}
                                />
                                <div>
                                    <p className='name'>iPhone 14 Pro Max 128GB - Black</p>
                                    <div className='price'>
                                        <span>26.690.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </Slider >
            </div >


        </>
    )
}

export default HomeComponent