import React from 'react';
import { Col, Image, Row } from 'antd';
import coverImg from 'assets/products/34.png';
import { FormattedMessage } from 'react-intl';

const About = () => {
  return (
    <div className="about-page">
      <h1 className="content-title align-center"><FormattedMessage id='about_us_title'/></h1>
      <Row gutter={50}>
        <Col xs={24} md={12}>
          <p className="content-text"><FormattedMessage id='about_us_content'/></p>
        </Col>
        <Col xs={24} md={12}>
          <Image src={coverImg} preview={false} />
        </Col>
      </Row>
    </div>
  );
};

export default About;
