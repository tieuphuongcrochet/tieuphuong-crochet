import React, { useEffect, useState } from 'react';
import CRUCategory from './ModalCUCategory';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { SearchProps } from 'antd/es/input';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction } from './categorySlice';

const CategoriesList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const {data, loading} = useAppSelector((state) => state.category);

	useEffect(()=> {
		dispatch(categoryAction.fetchData(''))
	},[]);

	const showModal = () => {
		setIsModalOpen(true);
	}

	const onEditRecord = (rd: React.Key) => {
		console.log('edit rd', rd);
	}

	const onDeleteRecord = (rd: React.Key) => {
		console.log('delete rd', rd);
	}

	const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
		console.log(info?.source, value);
	}

	return (
		<>
			<div className='category-page'>
				<SearchTable onAddNew={showModal} onSearch={onSearch} />
				<div className='admin-table'>
					<DataTable
						dataSource={data}
						onDeleteRecord={onDeleteRecord}
						onEditRecord={onEditRecord}
						loading={loading}
						visiblePagination
					/>
				</div>
			</div>
			<CRUCategory
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}

export default CategoriesList;
