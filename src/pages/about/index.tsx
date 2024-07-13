import { Col, Image, Row } from 'antd';
import coverImg from 'assets/about.jpg';

import { FormattedMessage } from 'react-intl';

const About = () => {

  return (
    <div className="about-page scroll-animate">
      <div className='animation-wrap'>
        <h1 className="content-title align-center">
          <FormattedMessage id='about_us_title' />
        </h1>
      </div>
      <Row gutter={50}>
        <Col xs={24} md={12}>
          <p className="content-text"><FormattedMessage id='about_us_content' /></p>
        </Col>
        <Col xs={24} md={12} className='animation-wrap'>
          <Image className='img-about' src={coverImg} preview={false} />
        </Col>
      </Row>
    </div>
  );
};

export default About;
