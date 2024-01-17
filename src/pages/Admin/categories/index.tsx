import React, { useState } from 'react';
import CRUCategory from './ModalCUCategory';
import { DataType } from 'models';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { SearchProps } from 'antd/es/input';

const CategoriesList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	}

	const originData: DataType[] = [];

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
						dataSource={originData}
						onDeleteRecord={onDeleteRecord}
						onEditRecord={onEditRecord}
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
