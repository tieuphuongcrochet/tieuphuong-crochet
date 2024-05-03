import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { SOCIALS } from 'utils/constant';
import HeaderPart from '../../components/HeaderPart';
import SocialBox from 'components/Social';
import ProductsNode from './components/ProductsNode';
import BlogsNode from './components/BlogsNode';
import FreePatternsNode from './components/FreePatternsNode';
import { useAppDispatch } from 'app/hooks';
import { homeActions } from './homeSlice';
import './index.scss';

const HomePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(homeActions.fetchData());
	}, [])

	return (
		<div className='home-page'>
			{/* Product list */}
			<ProductsNode />

			{/* Free patterns list */}
			<FreePatternsNode />

			{/* Social network */}
			<div className='social'>
				<HeaderPart
					isShowDivider
					titleId='home_social_title'
					descriptionId='home_social_description' />
				<Row gutter={[36, 36]}>
					{(SOCIALS || []).map(({ social, src, url, ...rest }, index) =>
						<Col key={`home_social_${index}`} xs={24} sm={12} lg={6}>
							<SocialBox social={social} src={src} url={url} {...rest} />
						</Col>
					)}
				</Row>
			</div>
			<BlogsNode />
		</div>
	)
}

export default HomePage;
