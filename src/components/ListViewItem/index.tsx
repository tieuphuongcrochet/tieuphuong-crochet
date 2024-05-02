import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Divider, Flex, Image, Row } from 'antd';

import { IMAGE_FALLBACK, SOCIAL_LINKS } from 'utils';
import { DataType } from 'models';
import FormattedCurrency from 'components/FormattedCurrency';
import './index.scss';
import { FormattedMessage } from 'react-intl';

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
		<Row className='list-card-item'>
			<Col xs={24} md={8} lg={6} className='image'>
				<Image
					alt={name}
					src={src || ''}
					fallback={IMAGE_FALLBACK}
				/>
			</Col>

			<Col xs={24} md={16} lg={18}>
				<div className='item-infor'>
					{/* describle */}
					<div className='information'>
						<Button className='title' type='link' onClick={onClickBtn}>{name}</Button>
						{author && <p className='author'>Tac gia: {author}</p>}
						<p>{description}</p>
					</div>

					{/* selling */}
					{price && <>
						<Divider />
						<Flex align='center' justify='space-between' className='shopping'>
							<FormattedCurrency price={price} currency_code={currency_code} />
							<div className='action'>
								<Link target='_blank' to={link || SOCIAL_LINKS.FACEBOOK}>
									<Button type='primary'><FormattedMessage id='btn_buy' /></Button>
								</Link>
							</div>
						</Flex>
					</>}
				</div>
			</Col>
		</Row>
	</>
	)

}

export default ListViewItem;
