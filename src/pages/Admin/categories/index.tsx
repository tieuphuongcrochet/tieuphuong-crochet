import React, { useEffect, useState } from 'react';
import CRUCategory from './ModalCUCategory';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { SearchProps } from 'antd/es/input';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction, selectCategories, selectLoading, selectTotalRecords } from './categorySlice';
import { Category, initialListParams } from 'models';
import { map } from 'lodash';

const CategoriesList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [params, setParams] = useState(initialListParams)
	const [categorySelected, setCategorySelected] = useState({} as Category);

	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoading);
	const categories = useAppSelector(selectCategories);
	const totalRecords = useAppSelector(selectTotalRecords);

	useEffect(() => {
		dispatch(categoryAction.fetchData(params));
	}, []);

	const showModal = () => {
		setIsModalOpen(true);
	}

	const onEditRecord = (rd: React.Key, record: any) => {
		console.log('edit rd', record);
		setCategorySelected(record);
		setIsModalOpen(true);
	}

	const onDeleteRecord = (rd: React.Key) => {
		console.log('delete rd', rd);
	}

	const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
		console.log(info?.source, value);
		const newParams = {
			...initialListParams,
			text: value
		};
		setParams(newParams)
		dispatch(categoryAction.fetchData(newParams));
	}

	const onPageChange = (pagination: any, filters: any, sorter: any) => {
		const { current, pageSize } = pagination;
		const newParams = {
			...params,
			_pageNo: current - 1,
			_pageSize: pageSize,
		}
		setParams(newParams)
		console.log('page', pagination, 'newParams', newParams);
		dispatch(categoryAction.fetchData(newParams));
	}

	return (
		<>
			<div className='category-page'>
				<SearchTable onAddNew={showModal} onSearch={onSearch} />
				<div className='admin-table'>
					<DataTable
						loading={loading}
						dataSource={categories}
						onDeleteRecord={onDeleteRecord}
						onEditRecord={onEditRecord}
						visiblePagination
						pageSize={params._pageSize}
						pageIndex={params._pageNo}
						totalPageSize={totalRecords}
						onChange={onPageChange}
					/>
				</div>
			</div>
			<CRUCategory
				categorySelected={categorySelected}
				setCategorySelected={setCategorySelected}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				parents={map(categories, c => ({
					label: c.name,
					value: c.id
				}))}
			/>
		</>
	)
}

export default CategoriesList;
