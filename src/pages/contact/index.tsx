import React from 'react';
import './index.scss';
import { Button, Col, Divider, Form, Input, Row, Space } from 'antd';
import { REGEX, SOCIALS } from 'utils';
import SocialBox from 'components/Social';

const Contact = () => {
  const onSendEmail = (values: any) => {
    console.log('send email', values);
  };

  return (
    <Space direction='vertical' size={40}>
      <Row gutter={30} className="contact-page">
        <Col xs={24} md={12}>
          <div>
            <h1 className="content-title">Liên lạc với tôi</h1>
            <p className="content-text">
              Bạn đang gặp vấn đề với đặt hàng hoặc yêu cầu móc theo mẫu bạn muốn? Hãy liên hệ với mình
              qua email hoặc tin nhắn trên trang facebook của mình nhé. Mình sẽ cố gắng hết sức để giúp
              bạn.
            </p>

          </div></Col>
        <Col xs={24} md={12}>
          <Form
            className='form-contact'
            name='contactForm'
            onFinish={onSendEmail}
          >
            <h2 className='align-center'>Send email for me</h2>
            <Form.Item name='title'
              rules={[
                {
                  required: true,
                  message: 'Please input your email'
                },
                {
                  pattern: new RegExp(REGEX.EMAIL),
                  message: 'The format email is incorected',
                },
              ]}>
              <Input placeholder='enter the email' />
            </Form.Item>
            <Form.Item name='title'
              rules={[
                {
                  required: true,
                  message: 'Please input title'
                }]}
            >
              <Input placeholder='enter  the title' />
            </Form.Item>
            <Form.Item name='content'
              rules={[
                {
                  required: true,
                  message: 'Please input the messageses'
                }]}>
              <Input.TextArea rows={4} placeholder='Enter the content' />
            </Form.Item>
            <div className='align-center'>
              <Button className='btn-border' type='primary' htmlType='submit'>
                Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Divider children={<h1 className='align-center'>Or contact me via</h1>} />
      <Row gutter={[50, 50]}>
        {(SOCIALS || []).map(({ social, src, url, ...rest }, index) =>
          <Col key={`social_${index}`} xs={12} md={6}>
            <SocialBox social={social} src={src} url={url} {...rest} />
          </Col>
        )}
      </Row>
    </Space>
  );
};

export default Contact;
