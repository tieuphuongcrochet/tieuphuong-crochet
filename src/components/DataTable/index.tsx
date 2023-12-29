import { Input, Button, Flex, Tooltip, Col, Pagination } from 'antd';
import React, { useState } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { Pattern, Product } from 'models';
import CardFreePattern from 'components/CardPattern';
import './style.scss';
import CardProduct from 'components/CardProduct';

interface DataTableProps {
	dataSource: Product[] | Pattern[]
	isFreePatterns?: boolean;
	total?: number;
	pageSize?: number;
	onChange?: Function;
	onSeach?: Function
}

const DataTable = (
	{ dataSource,
		isFreePatterns = false,
		total = 0,
		pageSize = 12,
		onChange,
		onSeach
	}: DataTableProps) => {

	const [direction, setDirection] = useState<string>('horizontal');
	const { Search } = Input;

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
	}
	return (
		<div className='data-list'>

			{/* search area */}
			<Flex className='search-wrap'>
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
				{/* Search */}
				<Search
					allowClear
					placeholder="input search text"
					style={{ width: 304 }}
					onSearch={onSearchBtn}
				/>
			</Flex>

			{/* Data source */}
			<Flex vertical={direction === 'vertical'} wrap='wrap'>
				{
					dataSource.map((item, index) =>
						<Col className='col-data' key={`freepattern_${index}`} xs={12} sm={8} lg={6} >
							{
								isFreePatterns ?
									<CardFreePattern title={item.name} author={item.name} src={item.src} /> :
									<CardProduct title={item.name} price={item.price || 0} src={item.src} />
							}
						</Col>
					)
				}
			</Flex>

			{/* Pagination area */}
			<Pagination
				className='pagination'
				responsive
				total={total}
				pageSize={pageSize}
				showSizeChanger
				showQuickJumper
				showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
				onChange={onChangePage}
			/>
		</div>
	)
}

export default DataTable;
