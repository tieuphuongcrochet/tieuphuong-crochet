import React from 'react';
import './index.scss';
import { Button, Col, Divider, Form, Input, Row, Space } from 'antd';
import { REGEX, SOCIALS } from 'utils';
import SocialBox from 'components/Social';
import { FormattedMessage } from 'react-intl';

const Contact = () => {
  const onSendEmail = (values: any) => {
    console.log('send email', values);
  };

  return (
    <Space direction='vertical' size={40}>
      <Row gutter={30} className="contact-page">
        <Col xs={24} md={12}>
          <div>
            <h1 className="content-title">
              <FormattedMessage id='contact_title' />
            </h1>
            <p className="content-text">
              <FormattedMessage id='contact_content' />
            </p>

          </div></Col>
        <Col xs={24} md={12}>
          <Form
            className='form-contact'
            name='contactForm'
            onFinish={onSendEmail}
          >
            <h2 className='align-center'>
              <FormattedMessage id='contact_form_title' />
            </h2>
            <Form.Item name='email'
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id='placeholder_input_email'/>
                },
                {
                  pattern: new RegExp(REGEX.EMAIL),
                  message: <FormattedMessage id='error_msg_incorrect_email'/>
                },
              ]}>
              <Input placeholder='enter the email' />
            </Form.Item>
            <Form.Item name='title'
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id='placeholder_input_title'/>
                }]}
            >
              <Input placeholder='enter  the title' />
            </Form.Item>
            <Form.Item name='content'
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id='placeholder_input_content'/>
                }]}>
              <Input.TextArea rows={4} placeholder='Enter the content' />
            </Form.Item>
            <div className='align-center'>
              <Button className='btn-border' type='primary' htmlType='submit'>
                <FormattedMessage id='btn_send' />
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Divider children={
        <h1 className='align-center'>
          <FormattedMessage id='contact_via' />
        </h1>} />
      <Row gutter={[36, 36]}>
        {(SOCIALS || []).map(({ social, src, url, ...rest }, index) =>
          <Col key={`social_${index}`} xs={24} sm={12} lg={6}>
            <SocialBox social={social} src={src} url={url} {...rest} />
          </Col>
        )}
      </Row>
    </Space>
  );
};

export default Contact;
