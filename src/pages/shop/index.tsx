import React, { useEffect, useState } from 'react';
import {ALL_ITEM, FILTER_LOGIC, FILTER_OPERATION, filterByText, ROUTE_PATH} from 'utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {DataType, ListParams, initialViewTableParams, Filter} from 'models';
import { productAction, selectLoading, selectProducts, selectTotalRecords } from 'saga/product/productSlice';
import { categoryAction } from 'saga/category/categorySlice';
import ViewTable from 'components/ViewTable';
import HeaderPart from 'components/HeaderPart';

const ShopPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const productList: DataType[] = useAppSelector(selectProducts);
	const totalRecords = useAppSelector(selectTotalRecords);
	const loading = useAppSelector(selectLoading);
	const categories = useAppSelector(state => state.category.data);

	const [params, setParams] = useState(initialViewTableParams);

	const onPageChange = (current: number, pageSize: number) => {
		const newParams = {
			...params,
			_pageNo: current - 1,
			_pageSize: pageSize,
		}
		setParams(newParams)
	}


	useEffect(() => {
		dispatch(productAction.fetchData(params));
	}, [params]);

	useEffect(() => {
		if (categories.length <= 0) {
			dispatch(categoryAction.fetchData());
		}
	}, [categories.length, dispatch]);

	const onSearchProducts = (value: string) => {
		const filters: Filter[] = filterByText(value, 'name', 'description');
		const newParams = {
			...initialViewTableParams,
			filters
		};
		setParams(newParams);
	}

	const onViewProduct = (id: React.Key) => {
		navigate(`${ROUTE_PATH.SHOP}/${ROUTE_PATH.DETAIL}/${id}`);
	};

	const onTabChange = (key: React.Key) => {
		const filters : Filter[] = key === ALL_ITEM.key ? [] : [
			{
				filterLogic: FILTER_LOGIC.ALL,
				filterCriteria: [
					{
						key: 'category.id',
						value: [`${key}`],
						operation: FILTER_OPERATION.IN
					}
				]
			}
		];
		const newParams: ListParams = {
			...initialViewTableParams,
			filters
		};
		setParams(newParams);
	}

	return (
		<div className='shop-page scroll-animate'>
			<HeaderPart titleId='shop_title' descriptionId='shop_description' />
			<ViewTable
				mode='Product'
				onReadDetail={(id) => onViewProduct(id)}
				dataSource={productList}
				total={totalRecords}
				loading={loading}
				isShowTabs
				itemsTabs={categories}
				pageIndex={params._pageNo}
				pageSize={params._pageSize}
				onPageChange={onPageChange}
				onSeach={onSearchProducts}
				onTabChange={onTabChange}
			/>
		</div>
	)
}

export default ShopPage;
