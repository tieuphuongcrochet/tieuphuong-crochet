import React from 'react';
import { Card, Flex, Image, Skeleton, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Pattern, TTranslationStatus } from 'models';
import { IMAGE_FALLBACK, TRANSLATION_STATUS, TRANSLATION_STATUS_COLOR } from 'utils';
import './index.scss';
import { FormattedMessage } from 'react-intl';

interface CardPatternProps {
	width?: string | number;
	pattern: Pattern;
	onReadDetail: Function;
	loading?: boolean;
};

const CardFreePattern = (
	{
		pattern = { name: '', author: '', src: '' },
		width,
		onReadDetail,
		loading,
	}: CardPatternProps) => {

	const { Meta } = Card;
	const { name, src, author, imagesPreview, status } = pattern;

	const getStatusColor = (status: TTranslationStatus) => {
		return TRANSLATION_STATUS_COLOR[status]
	}

	return (
		<Card
			loading={loading}
			hoverable
			className='card-free-pattern card-item'
			style={{ width: width || '100%' }}
			bodyStyle={{
				overflow: 'hidden',
			}}
			cover={
				<>
					{src && loading ?
						<Skeleton.Image active /> :
						<Image.PreviewGroup
							items={imagesPreview}
						>
							<Image
								alt={name}
								src={src}
								fallback={IMAGE_FALLBACK}
							/>
						</Image.PreviewGroup>
					}
				</>
			}
		>
			<Skeleton loading={!name} active>
				{name &&
					<Meta
						title={<span tabIndex={1} className='card-title' onClick={() => onReadDetail()}>{name}</span>}
						description={
							<Flex justify='space-between' align='center'>
								<div className='author'>
									<UserOutlined />&nbsp;{author}
								</div>
								{
									(status && status !== TRANSLATION_STATUS.NONE) &&
									<Tag className='status-tag' color={getStatusColor(status)}><FormattedMessage id={`translation_status.${status}`} /></Tag>
								}

							</Flex>
						}
					/>
				}
			</Skeleton>

		</Card>
	)

}

export default CardFreePattern;
