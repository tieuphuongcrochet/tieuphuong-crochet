import React from 'react';
import { Button, Card, Flex, Image } from 'antd';
import { EyeOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { CURRENCY, IMAGE_FALLBACK } from 'utils';
import './index.scss';

interface CardProductProps {
	width?: string | number;
	src?: string;
	title: string;
	author?: string;
	price: number;
	currency_code?: string;
	onPreview?: Function;
	onShopping?: Function;
	onReadDetail?: Function;
};

const CardProduct = (
	{
		width,
		src,
		title,
		price,
		currency_code,
		onPreview,
		onReadDetail,
		onShopping,
	}: CardProductProps) => {
	const { Meta } = Card;

	const descriptionNode = <div className='price-wrap'>
		{currency_code === CURRENCY.USD && <span>$</span>}
		<span>{price}</span>
		{currency_code === CURRENCY.VND && <span> VND</span>}
	</div>;

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

	return (<>
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
						src={src}
						fallback={IMAGE_FALLBACK}
					/>
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
	</>
	)

}

export default CardProduct;
