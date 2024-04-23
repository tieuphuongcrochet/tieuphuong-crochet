import React, { useEffect, useState } from 'react';
import CRUCategory from './ModalCUCategory';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { SearchProps } from 'antd/es/input';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction, selectCategories, selectLoading } from './categorySlice';
import { DataType, initialListParams } from 'models';
import { CheckboxOptionType } from 'antd';
import { map } from 'lodash';

const CategoriesList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [params, setParams] = useState(initialListParams)
	const [categorySelected, setCategorySelected] = useState({} as DataType);

	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoading);
	const categories = useAppSelector(selectCategories);

	useEffect(() => {
		dispatch(categoryAction.fetchData(params));
	}, []);

	const showModal = () => {
		setIsModalOpen(true);
	}

	const onEditRecord = (rd: React.Key, record: any) => {
		setCategorySelected(record);
		setIsModalOpen(true);
	}

	const onDeleteRecord = (key: React.Key) => {
		dispatch(categoryAction.delete(key));
	}

	const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
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
						onChange={onPageChange}
					/>
				</div>
			</div>
			<CRUCategory
				categorySelected={categorySelected}
				setCategorySelected={setCategorySelected}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				categories={map(categories, (item: DataType) => ({value: item.key, label: item.name})) as CheckboxOptionType[]}
			/>
		</>
	)
}

export default CategoriesList;
