import React, { useEffect, useState } from 'react';
import CRUCategory from './ModalCUCategory';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction, selectCategories, selectLoading } from '../../../saga/category/categorySlice';
import { DataType } from 'models';
import { CheckboxOptionType } from 'antd';
import { map } from 'lodash';

const CategoriesList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categorySelected, setCategorySelected] = useState({} as DataType);

	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectLoading);
	const categories = useAppSelector(selectCategories);

	useEffect(() => {
		dispatch(categoryAction.fetchData());
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

	return (
		<>
			<div className='category-page'>
				<SearchTable onAddNew={showModal} />
				<div className='admin-table'>
					<DataTable
						loading={loading}
						dataSource={categories}
						onDeleteRecord={onDeleteRecord}
						onEditRecord={onEditRecord}
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
