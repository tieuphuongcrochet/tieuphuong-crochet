import React, { useEffect, useState } from 'react';
import { ALL_ITEM, ROUTE_PATH } from 'utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { DataType, ListParams, initialListParams } from 'models';
import { productAction, selectLoading, selectProducts, selectTotalRecords } from 'pages/Admin/products/productSlice';
import { categoryAction } from 'pages/Admin/categories/categorySlice';
import ViewTable from 'components/ViewTable';

const ShopPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const productList: DataType[] = useAppSelector(selectProducts);
	const totalRecords = useAppSelector(selectTotalRecords);
	const loading = useAppSelector(selectLoading);
	const categories = useAppSelector(state => state.category.data);

	const [params, setParams] = useState(initialListParams);

	const onChange = (current: number, pageSize: number) => {
		const newParams = {
			...params,
			_pageNo: current - 1,
			_pageSize: pageSize,
		}
		setParams(newParams)
		dispatch(productAction.fetchData(newParams));
	}

	useEffect(() => {
		dispatch(productAction.fetchData(params));
	}, [dispatch, params]);

	useEffect(() => {
		if (categories.length <= 0) {
			dispatch(categoryAction.fetchData(''));
		}
	}, [categories.length, dispatch]);

	const onSearchProducts = (value: string) => {
		console.log('search products', params.categoryId, value);
		const newParams = {
			...initialListParams,
			categoryId: params.categoryId,
			searchText: value
		};
		setParams(newParams);
		dispatch(productAction.fetchData(newParams));
	}

	const onViewProduct = (id: React.Key) => {
		navigate(`${ROUTE_PATH.SHOP}/${ROUTE_PATH.DETAIL}/${id}`);
	};

	const onChangeTab = (key: string) => {
		const newParams: ListParams = {
			...initialListParams,
			categoryId: key === ALL_ITEM.key ? '' : key
		};

		setParams(newParams);
		dispatch(productAction.fetchData(newParams));
	}

	return (
		<div className='shop-page'>
			<ViewTable onReadDetail={(id) => onViewProduct(id)}
				dataSource={productList}
				total={totalRecords}
				loading={loading}
				isShowTabs
				itemsTabs={categories}
				pageIndex={params._pageNo}
				pageSize={params._pageSize}
				onChange={onChange}
				onSeach={onSearchProducts}
				onChangeTab={onChangeTab}
			/>
		</div>
	)
}

export default ShopPage;
