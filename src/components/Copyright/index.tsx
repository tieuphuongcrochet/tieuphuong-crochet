import { YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';

import './style.scss';
import { Divider, Space } from 'antd';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from 'utils';

const CopyRight = () => {
	return (
		<div className='copyright-wrap'>
			<p className='copyright'>Tiểu Phương © 2023 Created by Lượm & Phương</p>
			<div className='align-center' style={{ width: '100%' }}>
				<Space className='social-link'>
					<Link
						target='_blank'
						to={SOCIAL_LINKS.FACEBOOK}>
						<FacebookOutlined
							style={{ fontSize: 22 }} />
					</Link>
					<Divider type='vertical' />
					<Link target='_blank'
						to={SOCIAL_LINKS.YOUTUBE}>
						<YoutubeOutlined
							style={{ fontSize: 24 }} />
					</Link>
				</Space>
			</div>
		</div>
	)
}

export default CopyRight;
