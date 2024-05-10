import React, { useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import { SOCIALS } from 'utils/constant';
import HeaderPart from '../../components/HeaderPart';
import SocialBox from 'components/Social';
import ProductsNode from './components/ProductsNode';
import BlogsNode from './components/BlogsNode';
import FreePatternsNode from './components/FreePatternsNode';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { homeActions, selectHomeLoading } from './homeSlice';
import './index.scss';
import { animationHome } from 'utils';

const HomePage = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectHomeLoading);

	useEffect(() => {
		dispatch(homeActions.fetchData());
		const reset = animationHome();
		return () => {
			reset();
		}
	}, [])

	return (
		<div className='home-page'>
			<Spin spinning={loading} tip="Loading...">
				{/* Product list */}
				<ProductsNode />

				{/* Free patterns list */}
				<FreePatternsNode />

				{/* Social network */}
				<div className='social scroll-animate'>
					<HeaderPart
						isShowDivider
						titleId='home_social_title'
						descriptionId='home_social_description' />
					<Row className='justify-center' gutter={[{ xs: 36, md: 16, lg: 48 }, { xs: 36, md: 16, lg: 48 }]}>
						{(SOCIALS || []).map(({ social, src, url, ...rest }, index) =>
							<Col key={`home_social_${index}`} xs={12} md={6}>
								<SocialBox social={social} src={src} url={url} {...rest} />
							</Col>
						)}
					</Row>
				</div>
				<BlogsNode />
			</Spin>
		</div>
	)
}

export default HomePage;
