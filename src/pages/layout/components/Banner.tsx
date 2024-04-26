import React from 'react';
import { Button, Carousel } from 'antd';
import breadcrumb_backgroud from 'assets/breadcrumbs/1.jpg';

import banner2 from 'assets/bn4.jpg';
import banner3 from 'assets/bn3.jpg';
import banner4 from 'assets/banner2.jpg';
import { map } from 'lodash';

interface BannerItemProps {
	src: string;
	link?: string;
	text?: string;
};

const BannerItem = ({ src, link, text }: BannerItemProps) => {
	return (
		<div className='banner-item'>
			<img src={src} alt='Banner 1' />
			<div className='banner-item__infor'>
				<h1 className='text'>
					{text || 'Well come to my Website'}
				</h1>
				<Button className='btn-border' type='primary'>View Detail</Button>
			</div>
		</div>
	)
};

const Banner = () => {
	return (
		<div className='banner-wrap'>
			<Carousel autoplay>
				{
					map([breadcrumb_backgroud, banner2, banner3, banner4], (b, index) => 
						<BannerItem key={`banner_${index}`} src={b} />
					)
				}
			</Carousel>
		</div>
	)
}

export default Banner;
