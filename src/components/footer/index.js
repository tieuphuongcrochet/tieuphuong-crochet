import React from 'react';
import logo from '../../assets/logo.png';
import { Col, Flex, Image, Row } from 'antd';
import { FOOTER_LINK } from '../../utils/constant';
import { Link } from 'react-router-dom';
import './style.scss';
import { FormattedMessage } from 'react-intl';

const FooterPage = () => {
	return (
		<>
			<footer className='footer-wrap container'>
				<Flex vertical align='center'>
					<Image preview={false} className='footer-logo' src={logo} />
					<Row gutter={[48, 12]}>
						{FOOTER_LINK.map(({ name, path }, index) =>
							<Col key={`${name}_${index}`} md={8} xs={12}>
								<Link className='footer-link' to={path}><FormattedMessage id={name} /></Link>
							</Col>
						)}
					</Row>
					<p className='copyright'>Tiểu Phương © 2023 Created by PhuongLuom</p>
				</Flex>
			</footer>
		</>
	)
}

export default FooterPage;
