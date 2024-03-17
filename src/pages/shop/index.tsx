import React from 'react';
import { Pattern, Product } from 'models';
import DataTable from 'components/ViewTable';

const ShopPage = () => {

	const dataList: Product[] | Pattern[] = [
		{
			id: '1',
			name: 'Crochet flower',
			author: 'Bibi'
		},
		{
			id: '2',
			name: 'Crochet Dog',
			author: 'Tiểu Phương'
		},
		{
			id: '3',
			name: 'Crochet Cat',
			author: 'Tiểu Vũ'
		},
		{
			id: '4',
			name: 'Crochet Tree',
			author: 'Tiểu Vũ'
		},
		{
			id: '5',
			name: 'Crochet Carrot',
			author: 'Tiểu Vũ'
		},
		{
			id: '6',
			name: 'Crochet rabbit',
			author: 'Tiểu Vũ'
		},
	];

	const onViewProduct = (id: React.Key) => {
		console.log('onview product', id);
	};

	return (
		<div className='shop-page'>
			<DataTable onReadDetail={(id) => onViewProduct(id)}
				dataSource={dataList} />
		</div>
	)
}

export default ShopPage;
