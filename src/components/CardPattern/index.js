import React from 'react';
import { Button, Card, Flex, Image } from 'antd';
import { EyeOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import demo from '../../assets/products/pd2.jpg'
import './index.scss';

const CardFreePattern = (
	{
		witdh,
		src,
		title,
		author,
		onReadDetail
	}) => {
	const { Meta } = Card;

	return (
		<Card
			className='card-free-pattern'
			bordered={false}
			style={{ width: witdh || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
					<Image
						alt={title}
						src={src || demo} />
				</>
			}
		>
			{title &&
				<Meta
					title={<span tabIndex={1} className='card-title' type="link" onClick={onReadDetail}>{title}</span>}
					description={<div className='author'>Tác giả: {author}</div>}
				/>
			}
		</Card>
	)

}

export default CardFreePattern;
