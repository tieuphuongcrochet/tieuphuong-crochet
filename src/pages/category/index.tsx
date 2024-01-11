import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CRUCategory from './ModalCUCategory';

const CategoryList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	}
	return (
		<>
			<div className='category-page'>
				Category page

				<Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
					New account
				</Button>
			</div>
			<CRUCategory
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}

export default CategoryList;
