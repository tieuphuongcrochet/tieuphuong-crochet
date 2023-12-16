import React from 'react';
import { Button, Card, Flex, Image } from 'antd';
import { EyeOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import demo from '../../assets/products/pd2.jpg'
import './index.scss';
import { Link } from 'react-router-dom';

const CardProduct = (
	{
		witdh,
		src,
		title,
		price,
		onPreview,
		onReadDetail,
		onShopping
	}) => {
	const { Meta } = Card;

	const descriptionNode = <>
		{price && <div>{price} VND</div>}
	</>;

	return (
		<Card
			className={title ? 'card-product' : 'card-product not-title'}
			// hoverable
			bordered={false}
			style={{ width: witdh || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
					<Image
						preview={false}
						alt={title}
						src={src || demo} />
					<div className='mask'>
					</div>
					<Flex justify='center' className='card-actions actions-links'>
						<Button onClick={onPreview} className='preview' icon={<FullscreenOutlined />} />
						<Button onClick={onReadDetail} className='read' icon={<EyeOutlined />} />
						<Button onClick={onShopping} className='cart' icon={<ShoppingCartOutlined />} />
					</Flex>
				</>
			}
		>
			{title &&
				<Meta
					title={<span tabIndex={1} className='card-title' type="link" onClick={onReadDetail}>{title}</span>}
					description={descriptionNode}
				/>
			}
		</Card>
	)

}

export default CardProduct;
