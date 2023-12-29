import React from 'react';
import { Card, Image } from 'antd';

import demo from '../../assets/products/pd2.jpg'
import './index.scss';

interface CardPatternProps {
	width?: string | number;
	src?: string;
	title: string;
	author: string;
	onReadDetail?: Function
};

const CardFreePattern = (
	{
		width,
		src,
		title,
		author,
		onReadDetail
	}: CardPatternProps) => {
	const { Meta } = Card;

	const onDetail = () => {
		if(onReadDetail instanceof Function){
			onReadDetail();
		}
	}

	return (
		<Card
			className='card-free-pattern'
			bordered={false}
			style={{ width: width || '100%'}}
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
					title={<span tabIndex={1} className='card-title' onClick={onDetail}>{title}</span>}
					description={<div className='author'>Tác giả: {author}</div>}
				/>
			}
		</Card>
	)

}

export default CardFreePattern;
