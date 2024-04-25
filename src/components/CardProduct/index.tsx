import React from 'react';
import {  Card, Image, Tooltip } from 'antd';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { IMAGE_FALLBACK, ROUTE_PATH, SOCIAL_LINKS } from 'utils';
import { Product } from 'models';
import FormattedCurrency from 'components/FormattedCurrency';
import './index.scss';

interface CardProductProps {
	width?: string | number;
	product: Product;
	onPreview?: Function;
	onShopping?: Function;
	onReadDetail?: Function;
	parentLink?: string;
};

const CardProduct = (
	{
		width,
		product,
		onPreview,
		onReadDetail,
		onShopping,
		parentLink = `${ROUTE_PATH.SHOP}/${ROUTE_PATH.DETAIL}`
	}: CardProductProps) => {
	const { Meta } = Card;
	const { currency_code, price, name, src, link, id } = product;

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
			className={name ? 'card-product' : 'card-product not-title'}
			hoverable
			bordered={false}
			style={{ width: width || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
					<Image
						alt={name}
						src={src}
						fallback={IMAGE_FALLBACK}
					/>
				</>
			}
			actions={[
				<Tooltip color='#fc8282' title="Shop now">
					<Link key='shopping' target='_blank' to={link || SOCIAL_LINKS.FACEBOOK}>
						<ShoppingCartOutlined style={{ fontSize: 18 }} />
					</Link>
				</Tooltip>,
				<Tooltip color='#fc8282' title="View detail">
					<Link key="edit" to={`${parentLink}/${id}`} >
						<EditOutlined style={{ fontSize: 18 }} />
					</Link>
				</Tooltip>
			]}
		>
			{name &&
				<Meta
					title={<span tabIndex={1} className='card-title' onClick={onClickBtn}>{name}</span>}
					description={<FormattedCurrency currency_code={currency_code} price={price} />}
				/>
			}
		</Card>
	</>
	)

}

export default CardProduct;
