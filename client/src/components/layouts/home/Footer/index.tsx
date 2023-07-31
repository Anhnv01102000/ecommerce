import { Link } from 'react-router-dom';
import { Image, Col, Row } from 'antd';
import "./style.scss"


const HomeFooterComponent = () => {
    return (
        <>

            <div className="footer">
                <div className="footer-logo">
                    <Link className='logo' to="/">
                        <Image
                            width={120}
                            src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_570x207/https://cdn.tgdd.vn/mwgcart/topzone/images/logo-video.png?v=4"
                            preview={false}
                        />
                    </Link>
                </div>
                <div className="footer-content">
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" xs={24} md={6}>
                            <h3>Tổng đài </h3>
                            <p>Mua hàng: <span>1900.9696.42</span></p>
                            <p>CSKH: <span>1900.9696.42</span></p>
                        </Col>
                        <Col className="gutter-row" xs={24} md={6}>
                            <h3>Hệ thống cửa hàng</h3>
                            <p><a>Xem 100 cửa hàng</a></p>
                            <p><a>Nội quy cửa hàng</a></p>
                            <p><a>Chất lượng phục vụ</a></p>
                            <p><a>Chính sách bảo hành & đổi trả</a></p>
                        </Col>
                        <Col className="gutter-row" xs={24} md={6}>
                            <h3>Hỗ trợ khách hàng</h3>
                            <p><a>Điều kiện giao dịch chung</a></p>
                            <p><a>Hướng dẫn mua hàng online</a></p>
                            <p><a>Chính sách giao hàng</a></p>
                            <p><a>Hướng dẫn thanh toán</a></p>
                        </Col>
                        <Col className="gutter-row" xs={24} md={6}>
                            <h3>Về thương hiệu TopZone</h3>
                            <p><a>Tích điểm Quà tặng VIP</a></p>
                            <p><a>Giới thiệu TopZone</a></p>
                            <p><a>Bán hàng doanh nghiệp</a></p>
                            <p><a>Chính sách xử lý dữ liệu cá nhân</a></p>
                        </Col>
                    </Row>
                </div>
                <div className="footer-bottom">
                    <hr></hr>
                    <p>© 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007.</p>
                    <p>Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP. Hồ Chí Minh. Điện thoại: 028 38125960.</p>
                    <p>
                        Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, Đ. D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh.
                        Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Email: Tot.huynhvan@thegioididong.com.
                    </p>
                </div>
            </div>
        </>
    );
};
export default HomeFooterComponent;