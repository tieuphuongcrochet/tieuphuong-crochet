import React from 'react';
import './style.scss';
import { Card, Image } from 'antd';
import ReadMoreBtn from '../ReadMoreBtn';
import { Link } from 'react-router-dom';

const CardBlog = ({ src, title, description }) => {
	const { Meta } = Card;

	return (
		<Card
			className='card-article'
			bordered={false}
			cover={
				<div className='artice-image'>
					<Image src={src} alt={title} />
					<div className='artice-date'>
						<time dateTime={new Date()}>
							Jan
							<span>19</span>
						</time>
					</div>
				</div>
			}
		>
			<Meta title={
				<Link to='#' >{title}</Link>
			} description={description} />
			<ReadMoreBtn />
		</Card>
	)
}

export default CardBlog;
