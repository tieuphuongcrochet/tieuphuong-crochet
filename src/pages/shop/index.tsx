import React from 'react';
import { Pattern, Product } from 'models';
import DataTable from 'components/ViewTable';

const ShopPage = () => {

	

	const onViewProduct = (id: React.Key) => {
		console.log('onview product', id);
	};

	return (
		<div className='shop-page'>
			<DataTable onReadDetail={(id) => onViewProduct(id)}
				dataSource={[]} />
		</div>
	)
}

export default ShopPage;
