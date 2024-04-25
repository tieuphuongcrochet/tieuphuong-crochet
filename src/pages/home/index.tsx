import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { SOCIALS } from 'utils/constant';
import HeaderPart from './components/HeaderPart';
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
	}, [dispatch])

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
					title='Follow me on Social'
					description='Fanpage và kênh bán hàng của mình' />
				<Row gutter={[48, 48]}>
					{(SOCIALS || []).map(({ social, src, url, ...rest }, index) =>
						<Col key={`social_${index}`} xs={12} md={6}>
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
