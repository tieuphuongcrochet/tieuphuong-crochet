import { Input, Button, Flex, Tooltip, Col, Pagination, Menu, MenuProps, Empty, Row, Spin, Affix } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import { SegmentedValue } from 'antd/es/segmented';
import { FormattedMessage } from 'react-intl';

import { DataType } from 'models';
import CardFreePattern from 'components/CardPattern';
import CardProduct from 'components/CardProduct';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import ListViewItem from 'components/ListViewItem';
import CardBlog from 'components/CardBlog';
import { Post } from 'models/post';
import { ALL_ITEM, onScrollBody, TRANSLATION_OPTIONS, TRANSLATION_STATUS } from 'utils';
import PatternStatus from 'components/PatternStatus';
import './style.scss';

export interface ViewTableProps {
	dataSource: DataType[];
	mode: 'Pattern' | 'Product' | 'Blog';
	total?: number;
	pageSize?: number;
	onPageChange: Function;
	onSeach?: Function;
	pageIndex?: number;
	loading?: boolean;
	onReadDetail: (key: React.Key) => void;
	isShowTabs?: boolean;
	itemsTabs?: DataType[];
	tabsProps?: MenuProps;
	onTabChange?: (key: React.Key) => void;
	onStatusFilter?: (value: SegmentedValue) => void;
	isShowStatusFilter?: boolean;
}

const ViewTable = (
	{ dataSource,
		total = 0,
		pageSize = 12,
		onPageChange,
		onSeach,
		pageIndex = 0,
		itemsTabs = [],
		tabsProps,
		isShowTabs,
		mode,
		loading,
		isShowStatusFilter,
		onTabChange,
		onReadDetail,
		onStatusFilter,
	}: ViewTableProps) => {

	const [direction, setDirection] = useState<string>('horizontal');
	const { Search } = Input;
	const [currentTab, setCurrentNav] = useState('all');

	const onSearchBtn = (value: string) => {
		if (onSeach instanceof Function) {
			onSeach(value);
			onScrollBody('.data-list');
		}
	};

	const onChangeStatus = (value: SegmentedValue) => {
		if (onStatusFilter instanceof Function) {
			onStatusFilter(value);
		}
	};

	const onChange = (page: number, pageSize: number) => {
		if (onChange instanceof Function) {
			onPageChange(page, pageSize);
			onScrollBody('.data-list');
		}
	};

	const renderItems = map(itemsTabs, c => {
		return {
			label: c.name,
			key: c.key || 'N/A',
			icon: c.icon,
			children: c.children
		};
	});

	const mapTabsData = (data: DataType[]): any[] => {
		const result = map(data, c => {
			const { children, name, key, icon } = c;
			let newTab: ItemType = {
				label: name,
				key: key || 'N/A',
				icon: icon,
			};

			if (children && children.length > 0) {
				newTab = {
					...newTab,
					children: mapTabsData(children)
				}
			}
			return newTab;
		});

		return result;
	}

	const onClickMenu = (e: any) => {
		setCurrentNav(e.key);
		onTabChange instanceof Function && onTabChange(e.key);
	};

	const items =
		[
			{
				label: <FormattedMessage id={ALL_ITEM.label} />,
				key: ALL_ITEM.key
			},
			...mapTabsData(itemsTabs)
		];

	const getCardItem = (item: DataType) => {
		if (mode === 'Product') {
			return <CardProduct
				loading={loading}
				product={item}
				onReadDetail={() => onReadDetail(item.key)}
			/>
		} else if (mode === 'Pattern') {
			return <CardFreePattern
				loading={loading}
				pattern={item}
				onReadDetail={() => onReadDetail(item.key)}
			/>
		}
		return <CardBlog item={{ ...item } as Post} />
	}

	return (
		<div className='data-list'>
			<Affix offsetTop={0} className='affix-search-area'>
				<div>
					{/* search area */}
					<Flex className='search-wrap' justify='space-between'>
						{/* Search */}
						<Search
							allowClear
							placeholder="Tìm kiếm/ Search"
							style={{ width: 304 }}
							onSearch={onSearchBtn}
						/>

						{/* Translation status on large-screen*/}
						{isShowStatusFilter &&
							<PatternStatus
								className='large-screen'
								defaultValue={TRANSLATION_STATUS.ALL}
								onChange={onChangeStatus}
								options={TRANSLATION_OPTIONS}
							/>
						}

						{/* direction icon */}
						<Flex align='center' className='direction-icon'>
							<Tooltip color='#fc8282' title={<FormattedMessage id='btn_grid' />}>
								<Button type="text" onClick={() => setDirection('horizontal')}>
									<AppstoreOutlined style={{ color: direction === 'horizontal' ? '#fc8282' : '#707070', fontSize: '24px' }} />
								</Button>
							</Tooltip>
							<Tooltip color='#fc8282' title={<FormattedMessage id='btn_list' />}>
								<Button type="text" onClick={() => setDirection('vertical')}>
									<MenuOutlined style={{ color: direction === 'vertical' ? '#fc8282' : '#707070', fontSize: '24px' }} />
								</Button>
							</Tooltip>
						</Flex>
					</Flex>

					{/* Translation status on small-screen*/}
					{isShowStatusFilter &&
						<PatternStatus
							className='small-screen'
							defaultValue={TRANSLATION_STATUS.ALL}
							onChange={onChangeStatus}
							options={TRANSLATION_OPTIONS}
						/>
					}
					{/* Tabs categories */}
					{
						isShowTabs && renderItems &&
						<Menu
							className='tabs-menu'
							selectedKeys={[currentTab]}
							mode="horizontal"
							onClick={onClickMenu}
							{...tabsProps}
						>
							{
								items.map(item => {
									const { label, key, children, icon } = item;
									if (children && children.length > 0) {
										return <Menu.SubMenu onTitleClick={onClickMenu} key={key} title={label}>
											{
												children.map((c: any) => {
													const { label, key, icon } = c;
													return (
														<Menu.Item key={key} icon={icon}>
															{label}
														</Menu.Item>
													)
												})
											}
										</Menu.SubMenu>
									}
									return (
										<Menu.Item key={key} icon={icon}>
											{label}
										</Menu.Item>
									)
								})
							}
						</Menu>
					}
				</div>
			</Affix>


			<Spin spinning={loading} tip="Loading...">
				{/* Data source */}
				{
					direction === 'vertical' ?
						<Flex vertical className='list-view' >
							{
								dataSource && dataSource.map((item, index) =>
									<div className='list-view-item' key={`list-view-item-${index}`}>
										<ListViewItem
											data={item}
											onReadDetail={() => onReadDetail(item.key)}
										/>
									</div>
								)
							}
						</Flex> :

						<Row gutter={[{ xs: 8, sm: 16, xl: 24 }, { xs: 12, sm: 16, xl: 24 }]}>
							{
								dataSource && dataSource.map((item, index) =>

									<Col className='col-data' key={`freepattern_${index}`} xs={12} sm={8} lg={6} >
										{getCardItem(item)}
									</Col>
								)
							}
						</Row>
				}

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
						onChange={onChange}
					/>
					:
					<Empty
						imageStyle={{ height: 80 }}
						image={Empty.PRESENTED_IMAGE_SIMPLE}
					/>
				}
			</Spin>
		</div>
	)
}

export default ViewTable;
