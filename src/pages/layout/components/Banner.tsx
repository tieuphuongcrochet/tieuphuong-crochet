import React from 'react';
import { Carousel } from 'antd';

import { map } from 'lodash';
import { useAppSelector } from 'app/hooks';
import { selectBanners } from 'pages/home/homeSlice';
import { getBannersByType } from 'utils';
import BannerItem from 'components/BannerItem';

const BannersList = () => {
	const banners = useAppSelector(selectBanners);

	return (
		<div className='banner-wrap'>
			<Carousel autoplay arrows={true} dots={{className: 'dots-custom'}}>
				{
					map(getBannersByType(banners, 'Home'), (b, index) => (
						<BannerItem key={`banner_${index}`} banner={b} />
					))
				}
			</Carousel>
		</div>
	)
}

export default BannersList;
