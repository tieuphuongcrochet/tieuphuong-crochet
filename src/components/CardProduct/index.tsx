import React from 'react';
import {  Card, Image, Skeleton, Tooltip } from 'antd';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { IMAGE_FALLBACK, ROUTE_PATH, SOCIAL_LINKS } from 'utils';
import { Product } from 'models';
import FormattedCurrency from 'components/FormattedCurrency';
import './index.scss';
import { FormattedMessage } from 'react-intl';

interface CardProductProps {
	width?: string | number;
	product: Product;
	onPreview?: Function;
	onShopping?: Function;
	onReadDetail?: Function;
	parentLink?: string;
	loading?: boolean;
};

const CardProduct = (
	{
		width,
		product,
		onPreview,
		onReadDetail,
		onShopping,
		parentLink = `${ROUTE_PATH.SHOP}/${ROUTE_PATH.DETAIL}`,
		loading
	}: CardProductProps) => {
	const { Meta } = Card;
	const { currency_code, price, name, src, link, id, imagesPreview } = product;

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
			className={name ? 'card-product card-item' : 'card-product not-title card-item'}
			hoverable
			bordered={false}
			style={{ width: width || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
				{src && loading ?
					<Skeleton.Image active /> :
					<Image.PreviewGroup
						items={imagesPreview}
					>
						<Image
							alt={name}
							src={src}
							fallback={IMAGE_FALLBACK}
						/>
					</Image.PreviewGroup>
				}
			</>
			}
			actions={[
				<Tooltip color='#fc8282' title={<FormattedMessage id='btn_buy'/>}>
					<Link key='shopping' target='_blank' to={link || SOCIAL_LINKS.FACEBOOK}>
						<ShoppingCartOutlined style={{ fontSize: 18 }} />
					</Link>
				</Tooltip>,
				<Tooltip color='#fc8282' title={<FormattedMessage id='btn_view_detail'/>}>
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
