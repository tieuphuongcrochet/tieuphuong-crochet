import { Input, Button, Flex, Tooltip, Col, Pagination, Menu, MenuProps, Empty, Row } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { map } from 'lodash';
import { ALL_ITEM } from 'utils';
import { FormattedMessage } from 'react-intl';

import { DataType } from 'models';
import CardFreePattern from 'components/CardPattern';
import CardProduct from 'components/CardProduct';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import './style.scss';
import ListViewItem from 'components/ListViewItem';

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

	const onSearchBtn = (value: string) => {
		if (onSeach instanceof Function) {
			onSeach(value);
		}
	};

	const onChangePage = (page: number, pageSize: number) => {
		if (onChange instanceof Function) {
			onChange(page, pageSize);
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
		onChangeTab instanceof Function && onChangeTab(e.key);
	};

	const items =
		[
			{
				label: <FormattedMessage id={ALL_ITEM.label} />,
				key: ALL_ITEM.key
			},
			...mapTabsData(itemsTabs)
		];

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
				<Flex align='center' className='direction-icon'>
					<Tooltip color='#fd9b9b' title="Grid">
						<Button type="text" onClick={() => setDirection('horizontal')}>
							<AppstoreOutlined style={{ color: direction === 'horizontal' ? '#fd9b9b' : '#707070', fontSize: '24px' }} />
						</Button>
					</Tooltip>
					<Tooltip color='#fd9b9b' title="List">
						<Button type="text" onClick={() => setDirection('vertical')}>
							<MenuOutlined style={{ color: direction === 'vertical' ? '#fd9b9b' : '#707070', fontSize: '24px' }} />
						</Button>
					</Tooltip>
				</Flex>
			</Flex>

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

			{/* Data source */}
			{
				direction === 'vertical' ?
					<Flex vertical className='list-view' >
						{
							dataSource && dataSource.map((item, index) =>
								<div className='list-view-item' key={`list-view-item-${index}`}>
									<ListViewItem data={item} />
								</div>
							)
						}
					</Flex> :

					<Row gutter={[24, 24]}>
						{
							dataSource && dataSource.map((item, index) =>

								<Col className='col-data' key={`freepattern_${index}`} xs={24} sm={12} md={8} lg={6} >
									{
										isFreePatterns ?
											<CardFreePattern
												pattern={item}
												onReadDetail={() => onReadDetail(item.key)}
											/> :
											<CardProduct
												title={item.name || 'N/A'}
												price={item.price || 0}
												src={item.src}
												currency_code={item.currency_code}
												onReadDetail={() => onReadDetail(item.key)}
											/>
									}
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
