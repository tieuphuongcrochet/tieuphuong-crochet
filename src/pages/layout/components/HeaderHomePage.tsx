import React from 'react';
import { Carousel, Col, Row } from 'antd';
import product from 'assets/1.jpg';
import banner from 'assets/2.jpg';
import banner2 from 'assets/bn4.jpg';
import banner3 from 'assets/bn3.jpg';
import banner4 from 'assets/banner2.jpg';
import pattern from 'assets/3.jpg';
import '../index.scss';

const HeaderHomePage = () => {
	return (
		<div className='layout-wrap container'>
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
		</div>
	)
}

export default HeaderHomePage;
