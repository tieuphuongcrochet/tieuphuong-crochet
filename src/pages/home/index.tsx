import React, { useEffect } from 'react';
import './index.scss';
import product from '../../assets/1.jpg';
import banner from '../../assets/2.jpg';
import banner2 from '../../assets/bn4.jpg';
import banner3 from '../../assets/bn3.jpg';
import banner4 from '../../assets/banner2.jpg';
import pattern from '../../assets/3.jpg';
import { Carousel, Col, Row } from 'antd';
import { SOCIALS } from '../../utils/constant';
import HeaderPart from '../../components/HeaderPart';
import SocialBox from '../../components/Social';
import ProductsNode from './components/ProductsNode';
import BlogsNode from './components/BlogsNode';
import FreePatternsNode from './components/FreePatternsNode';
import { useAppDispatch } from 'app/hooks';
import { homeActions } from './homeSlice';

const HomePage = () => {

	const dispatch = useAppDispatch();

	useEffect(() => {
		// homeApi.getAll().then((response) => console.log(response));
		dispatch(homeActions.fetchData());
	}, [dispatch])

	return (
		<div className='home-page'>
			<Row className='introduce'>
				<Col span={5}
					style={{ backgroundImage: `url(${product})` }}
					className='introduce-product introduce-product-bg'>
					Product
				</Col>
				<Col span={14}
					className='introduce-banner'>
					<Carousel autoplay>
						<img src={banner} alt='Banner 1' />
						<img src={banner2} alt='Banner 2' />
						<img src={banner3} alt='Banner 3' />
						<img src={banner4} alt='Banner 4' />
						{/* <div className='introduce-banner-bg' style={{ backgroundImage: `url(${banner})` }}>
							Banner 1
						</div> */}
					</Carousel>
				</Col>
				<Col span={5}
					style={{ backgroundImage: `url(${pattern})` }}
					className='introduce-pattern introduce-pattern-bg'>pattern</Col>
			</Row>
			{/* Product list */}
			<ProductsNode />

			{/* Free patterns list */}
			<FreePatternsNode />

			{/* Social network */}
			<div className='social'>
				<HeaderPart title='Follow me on Social' description='Fanpage và kênh bán hàng của mình' />
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
