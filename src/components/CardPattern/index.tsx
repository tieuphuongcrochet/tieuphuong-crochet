import React from 'react';
import { Card, Image, Skeleton } from 'antd';

import demo from 'assets/products/pd2.jpg'
import './index.scss';
import { DataType, Pattern, Product } from 'models';

interface CardPatternProps {
	width?: string | number;
	pattern: Pattern | Product | DataType;
	onReadDetail: Function;
	loading?: boolean
};

const CardFreePattern = (
	{
		pattern = { name: '', author: '', src: '' },
		width,
		onReadDetail,
		loading
	}: CardPatternProps) => {
	console.log('pattern card', pattern);

	const { Meta } = Card;
	const { name, src, author } = pattern;

	return (
		<Card
			loading={loading}
			className='card-free-pattern'
			bordered={false}
			style={{ width: width || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
					{src ?
						<Image
							alt={name}
							src={src} /> :
						<Skeleton.Image active />
					}
				</>
			}
		>
			<Skeleton loading={!name} active>
				{name &&
					<Meta
						title={<span tabIndex={1} className='card-title' onClick={() => onReadDetail()}>{name}</span>}
						description={<div className='author'>Tác giả: {author}</div>}
					/>
				}
			</Skeleton>

		</Card>
	)

}

export default CardFreePattern;
