import { Card, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';
import './style.scss';

const SocialBox = ({ textColor, src, social, url, description }) => {
	return (
		<a href={url}
			target='_blank'
			rel="noreferrer"
			className='card-social'
		>
			<Card
				bordered={false}
				hoverable
				cover={
					<Image
						preview={false}
						alt={social || 'Tiệm len Tiểu Phương'}
						src={src} />
				}
			>
				<Meta title={<span style={{ color: textColor || '#333' }}>{social}</span>}
					description={description} />
			</Card>
		</a>
	)
}

SocialBox.propTypes = {
	textColor: PropTypes.string,
	social: PropTypes.string.isRequired,
	src: PropTypes.string,
	description: PropTypes.string,
	url: PropTypes.string
};

SocialBox.defaultProps = {
	textColor: '#333',
	src: logo,
	url: 'https://www.facebook.com/tieuconuong.tiemlen/',
	description: ''
};

export default SocialBox;