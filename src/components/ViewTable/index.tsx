import { Input, Button, Flex, Tooltip, Col, Pagination, Menu, MenuProps, Watermark, Empty } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import { ALL_ITEM } from 'utils';
import { FormattedMessage } from 'react-intl';

import { DataType } from 'models';
import CardFreePattern from 'components/CardPattern';
import CardProduct from 'components/CardProduct';
import logo from 'assets/logo.png';
import './style.scss';

export interface ViewTableProps {
	dataSource: DataType[];
	isFreePatterns?: boolean;
	total?: number;
	pageSize?: number;
	onChange?: Function;
	onSeach?: Function;
	pageIndex?: number;
	loading?: boolean;
	onReadDetail: (key: React.Key) => void;
	isShowTabs?: boolean;
	itemsTabs?: DataType[];
	tabsProps?: MenuProps;
	onChangeTab?: Function
}

const ViewTable = (
	{ dataSource,
		isFreePatterns = false,
		total = 0,
		pageSize = 12,
		onChange,
		onSeach,
		pageIndex = 0,
		itemsTabs = [],
		tabsProps,
		isShowTabs,
		onChangeTab,
		onReadDetail,
	}: ViewTableProps) => {

	const [direction, setDirection] = useState<string>('horizontal');
	const { Search } = Input;
	const [currentTab, setCurrentNav] = useState('all');

	console.log('itemsTabs', itemsTabs);
	const onSearchBtn = (value: string) => {
		console.log('search value', value);
		if (onSeach instanceof Function) {
			onSeach(value);
		}
	};

	const onChangePage = (page: number, pageSize: number) => {
		console.log('child node, page', page, 'pagesize', pageSize);
		if (onChange instanceof Function) {
			onChange(page, pageSize);
		}
	};

	const renderItems = map(itemsTabs, c => {
		return {
			label: c.name,
			key: c.key || 'N/A',
			icon: c.icon
		};
	});

	const onClickTabs = (e: any) => {
		console.log('click ', e);
		setCurrentNav(e.key);
		onChangeTab instanceof Function && onChangeTab(e.key);
	};

	return (
		<div className='data-list'>
			{/* search area */}
			<Flex className='search-wrap' justify='space-between'>
				{/* Search */}
				<Search
					allowClear
					placeholder="input search text"
					style={{ width: 304 }}
					onSearch={onSearchBtn}
				/>
				{/* direction icon */}
				<div className='direction-icon'>
					<Tooltip color='#fd9b9b' title="Grid">
						<Button type="text" onClick={() => setDirection('horizontal')}>
							<AppstoreOutlined style={{ color: direction === 'horizontal' ? '#fd9b9b' : '#292929' }} />
						</Button>
					</Tooltip>
					<Tooltip color='#fd9b9b' title="List">
						<Button type="text" onClick={() => setDirection('vertical')}>
							<MenuOutlined style={{ color: direction === 'vertical' ? '#fd9b9b' : '#292929' }} />
						</Button>
					</Tooltip>
				</div>
			</Flex>

			{/* Tabs categories */}
			{
				isShowTabs && renderItems &&
				<Menu
					className='tabs-menu'
					selectedKeys={[currentTab]}
					mode="horizontal"
					onClick={onClickTabs}
					items={
						[
							{
								label: <FormattedMessage id={ALL_ITEM.label} />,
								key: ALL_ITEM.key
							},
							...renderItems
						]}
					{...tabsProps}
				/>
			}

			{/* Data source */}
			<Watermark
				content={['小方', 'Tiểu Phương Crochet']}
			>
				<Flex vertical={direction === 'vertical'} wrap='wrap'>
					{
						dataSource && dataSource.map((item, index) =>
							<Col className='col-data' key={`freepattern_${index}`} xs={12} sm={8} lg={6} >
								{
									isFreePatterns ?
										<CardFreePattern
											pattern={item}
											onReadDetail={() => onReadDetail(item.key)}
										/> :
										<CardProduct title={item.name || 'N/A'} price={item.price || 0} src={item.src} />
								}
							</Col>
						)
					}
				</Flex>
			</Watermark>

			{/* Pagination area */}
			{dataSource?.length > 0 ?
				<Pagination
					className='pagination'
					responsive
					total={total}
					// if not use value = -1}
					{
					...(pageIndex !== - 1 ? { current: pageIndex + 1 } : {})
					}
					pageSize={pageSize}
					showSizeChanger
					showQuickJumper
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					onChange={onChangePage}
				/>
				:
				<Empty
					imageStyle={{ height: 80 }}
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			}
		</div>
	)
}

export default ViewTable;
