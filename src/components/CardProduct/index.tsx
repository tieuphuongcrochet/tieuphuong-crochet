import React from 'react';
import { Button, Card, Flex, Image } from 'antd';
import { EyeOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import demo from 'assets/products/pd2.jpg'
import './index.scss';

interface CardProductProps {
	width?: string | number;
	src?: string;
	title: string;
	author?: string;
	price: number;
	currency?: string;
	onPreview?: Function;
	onShopping?: Function;
	onReadDetail?: Function
};

const CardProduct = (
	{
		width,
		src,
		title,
		price,
		currency,
		onPreview,
		onReadDetail,
		onShopping
	}: CardProductProps) => {
	const { Meta } = Card;

	const descriptionNode = <>
		{price && <div>{price} {currency}</div>}
	</>;

	const onClickBtn = () => {
		if (onReadDetail instanceof Function) {
			onReadDetail();
		}
		if (onPreview instanceof Function) {
			onPreview();
		}
		if (onShopping instanceof Function) {
			onShopping();
		}
	}

	return (
		<Card
			className={title ? 'card-product' : 'card-product not-title'}
			// hoverable
			bordered={false}
			style={{ width: width || '100%' }}
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
						<Button onClick={onClickBtn} className='preview' icon={<FullscreenOutlined />} />
						<Button onClick={onClickBtn} className='read' icon={<EyeOutlined />} />
						<Button onClick={onClickBtn} className='cart' icon={<ShoppingCartOutlined />} />
					</Flex>
				</>
			}
		>
			{title &&
				<Meta
					title={<span tabIndex={1} className='card-title' onClick={onClickBtn}>{title}</span>}
					description={descriptionNode}
				/>
			}
		</Card>
	)

}

export default CardProduct;
