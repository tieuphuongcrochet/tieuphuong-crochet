import { useAppSelector } from 'app/hooks';
import React from 'react';
import './index.scss';

const Contact = () => {
  const userRole = useAppSelector((state) => state.auth.currentUser);

  console.log('userRole', userRole);

  return (
    <div className="contact-page">
      <h1 className="contact-title">Liên lạc với tôi</h1>
      <p className="contact-text">
        Bạn đang gặp vấn đề với đặt hàng hoặc yêu cầu móc theo mẫu bạn muốn? Hãy liên hệ với mình
        qua email hoặc tin nhắn trên trang facebook của mình nhé. Mình sẽ cố gắng hết sức để giúp
        bạn.
      </p>
    </div>
  );
};

export default Contact;
