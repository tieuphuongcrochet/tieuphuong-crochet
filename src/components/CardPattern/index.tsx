import React from 'react';
import { Card, Image, Skeleton } from 'antd';

import './index.scss';
import { Pattern, Product } from 'models';

interface CardPatternProps {
	width?: string | number;
	pattern: Pattern | Product;
	onReadDetail: Function;
	loading?: boolean;
};

const CardFreePattern = (
	{
		pattern = { name: '', author: '', src: '' },
		width,
		onReadDetail,
		loading,
	}: CardPatternProps) => {

	const { Meta } = Card;
	const { name, src, author, imagesPreview } = pattern;


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
						<Image.PreviewGroup
							items={imagesPreview}
						>
							<Image
								alt={name}
								src={src} />
						</Image.PreviewGroup>
						:
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
