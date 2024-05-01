import React from 'react';
import { Col, Image, Row } from 'antd';
import coverImg from 'assets/products/34.png';

const About = () => {
  return (
    <div className="about-page">
      <h1 className="content-title align-center">Chào mừng bạn đến website của tôi</h1>
      <Row gutter={50}>
        <Col xs={24} md={12}>
          <p className="content-text">
            Cảm ơn bạn đã ghé thăm website của mình nhé. Hy vọng bạn sẽ tìm thấy những điều tốt đẹp ở
            đây. Mình rất thích móc len và tạo ra những mẫu đồ đẹp và độc đáo. Mong bạn sẽ thích những
            sản phẩm mình làm ra. Trên trang web của mình có rất nhiều mẫu móc len đẹp mà mình đã sưu
            tầm, tương lai mình sẽ cập nhật thêm nhiều mẫu móc len đẹp khác nữa và những mấu mà tự mình
            sáng tạo ra nè, bạn hãy tham khảo và chọn cho mình một mẫu ưng ý nhé. Ngoài những mẫu móc
            len đẹp ra mình cũng có bán những sản phẩm mình đã móc sẵn. Đối với những sản phẩm mình móc
            sẵn, bạn cũng có thể yêu cầu mình móc theo mẫu bạn muốn bằng cách gửi yêu cầu qua email của
            mình hoặc qua tin nhắn trên trang facebook của mình. Mình sẽ cố gắng hết sức để mang đến cho
            bạn những sản phẩm tốt nhất. Cảm ơn bạn đã ủng hộ mình.
          </p>
        </Col>
        <Col xs={24} md={12}>
          <Image src={coverImg} preview={false} />
        </Col>
      </Row>
    </div>
  );
};

export default About;
