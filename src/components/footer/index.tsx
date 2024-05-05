import React from 'react';
import logo from 'assets/logo.png';
import { Col, Flex, Image, Row } from 'antd';
import { FOOTER_LINK, ROUTE_PATH } from 'utils/constant';
import { Link } from 'react-router-dom';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import { includes } from 'lodash';
import CopyRight from 'components/Copyright';
interface FooterProps {
	currentNav: string
}
const FooterPage = ({ currentNav }: FooterProps) => {

	const getActiveClass = (path: string) => {
		if (currentNav === ROUTE_PATH.HOME) {
			return path === currentNav ? 'actived' : '';
		} else {
			return includes(path, currentNav) ? 'actived' : '';
		}
	}

	return (
		<>
			<footer className='footer-wrap container'>
				<Flex vertical align='center'>
					<Image preview={false} className='footer-logo' src={logo} />
					<Row gutter={[48, 12]}>
						{FOOTER_LINK.map(({ name, path }, index) =>
							<Col className={`${getActiveClass(path)}`} key={`${name}_${index}`} md={8} xs={12}>
								<Link className='footer-link' to={path}><FormattedMessage id={name} /></Link>
							</Col>
						)}
					</Row>
					<CopyRight />
				</Flex>
			</footer>
		</>
	)
}

export default FooterPage;
