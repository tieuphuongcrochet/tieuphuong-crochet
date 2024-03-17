import React from 'react';
import { Card, Image } from 'antd';

import demo from 'assets/products/pd2.jpg'
import './index.scss';
import { DataType, Pattern, Product } from 'models';

interface CardPatternProps {
	width?: string | number;
	pattern: Pattern | Product | DataType;
	onReadDetail: Function
};

const CardFreePattern = (
	{
		pattern = {name: '', author: '', src: ''},
		width,
		onReadDetail
	}: CardPatternProps) => {

	const { Meta } = Card;
	const { name, src, author } = pattern;

	return (
		<Card
			className='card-free-pattern'
			bordered={false}
			style={{ width: width || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
					<Image
						alt={name}
						src={src || demo} />
				</>
			}
		>
			{name &&
				<Meta
					title={<span tabIndex={1} className='card-title' onClick={()=>onReadDetail()}>{name}</span>}
					description={<div className='author'>Tác giả: {author}</div>}
				/>
			}
		</Card>
	)

}

export default CardFreePattern;
