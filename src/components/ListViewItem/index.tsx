import React from 'react';
import { Button, Card, Col, Flex, Image, Row } from 'antd';
import { EyeOutlined, FullscreenOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { CURRENCY, IMAGE_FALLBACK } from 'utils';
import './index.scss';
import { DataType, Pattern, Product } from 'models';
import { Link } from 'react-router-dom';

interface ListViewItemProps {
	data: DataType;
	onPreview?: Function;
	onShopping?: Function;
	onReadDetail?: Function;
	isListView?: boolean;
};

const ListViewItem = (
	{
		data,
		onPreview,
		onReadDetail,
		onShopping,
	}: ListViewItemProps) => {
	const { price, name, src, author, link, description, currency_code } = data;


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
		<Row gutter={[24, 24]} className='list-card-item'>
			<Col xs={24} md={8}>
				<Image
					alt={name}
					src={src || ''}
					fallback={IMAGE_FALLBACK}
				/>
			</Col>

			<Col xs={24} md={16} >
				<Flex gap={16} className='item-infor' vertical justify='space-between'>
					<div className='information'>
						<h2>{name}</h2>
						<p><i>Tac gia: {author}</i></p>
						<p>{description}</p>
					</div>
					<Flex align='center' justify='space-between' className='shopping'>
						<div className='price-wrap'>
							{currency_code === CURRENCY.USD && <span>$</span>}
							<span>{price}</span>
							{currency_code === CURRENCY.VND && <span>VND</span>}
						</div>
						{
							link && <div className='action'>
								<Link target='_blank' to={link || '#'}>
									<Button type='primary'>Mua hang</Button>
								</Link>
							</div>}
					</Flex>
				</Flex>
			</Col>
		</Row>
	</>
	)

}

export default ListViewItem;
