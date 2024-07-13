import React from 'react';
import './style.scss';
import { Card, Image } from 'antd';
import ReadMoreBtn from '../ReadMoreBtn';
import { Link } from 'react-router-dom';
import { Post } from 'models/post';
import { ROUTE_PATH } from 'utils';

interface BlogCardProps {
	item: Post,
}

const BlogCard = ({ item }: BlogCardProps) => {
	const { Meta } = Card;
	const { createdDate, title, src, id } = item;
	const detailPath = `${ROUTE_PATH.BLOG}/${ROUTE_PATH.DETAIL}/${id}`;

	const date = new Date(createdDate);
	let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
	let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

	return (
		<Card
			className='card-article card-item'
			bordered={false}
			cover={
				<div className='artice-image'>
					<Image src={src} alt={title} />
					<div className='artice-date'>
						{/* <time > */}
						<time >
							{month}
							<span>{day}</span>
						</time>
					</div>
				</div>
			}
		>
			<Meta title={
				<Link to={detailPath}>{title}</Link>
			}
			/>
			<ReadMoreBtn path={detailPath} />
		</Card>
	)
}

export default BlogCard;
