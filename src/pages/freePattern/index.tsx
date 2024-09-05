import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { SegmentedValue } from 'antd/es/segmented';
import { useNavigate } from 'react-router-dom';

import { DataType, Filter, initialViewTableParams, ListParams } from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';
import { FILTER_LOGIC, FILTER_OPERATION, filterByText, getCategoryFilter, getFilters, mapNameFilters, ROUTE_PATH, TRANSLATION_STATUS } from 'utils';
import { categoryAction } from 'saga/category/categorySlice';
import HeaderPart from 'components/HeaderPart';

const FreePatterns = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const paternsList: DataType[] = useAppSelector(selectPatterns);
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
		setParams(newParams);
	}

	useEffect(() => {
		let tempParams = [...params.filters]
		if (tempParams.length > 0) {
			tempParams = getFilters(tempParams);
		}
		dispatch(patternAction.fetchData({ ...params, filters: tempParams }));
	}, [params]);

	useEffect(() => {
		if (categories.length <= 0) {
			dispatch(categoryAction.fetchData());
		}
	}, []);

	const onSearchPatterns = (value: string) => {
		const filters: Filter = filterByText(value, 'name', 'description', 'author');
		const tempFilters = mapNameFilters(params.filters, 'searchText', filters);

		const newParams = {
			...initialViewTableParams,
			filters: tempFilters
		};
		setParams(newParams);
	}

	const onViewPattern = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
	};

	const onTabChange = (key: React.Key) => {
		const categoryFilter = getCategoryFilter(key);

		const newFilters = mapNameFilters(params.filters, 'category', categoryFilter);

		const newParams: ListParams = {
			...initialViewTableParams,
			filters: newFilters
		};

		setParams(newParams);
	}

	const onStatusFilter = (value: SegmentedValue) => {
		const statusFilter: Filter = value === TRANSLATION_STATUS.ALL ? {} as Filter :
			{
				name: 'statusFilter',
				filterLogic: FILTER_LOGIC.ALL,
				filterCriteria: [
					{
						key: 'status',
						value,
						operation: FILTER_OPERATION.EQUAL
					}
				],
			}
			;

		const tempFilters = mapNameFilters(params.filters, 'statusFilter', statusFilter);

		const newParams: ListParams = {
			...initialViewTableParams,
			filters: tempFilters
		};

		setParams(newParams);
	}

	return (
		<div className='free-patterns-page scroll-animate'>
			<HeaderPart titleId='free_pattern_title' descriptionId='free_pattern_description' />
			<ViewTable
				mode='Pattern'
				onReadDetail={(id) => onViewPattern(id)}
				pageIndex={params._pageNo}
				pageSize={params._pageSize}
				dataSource={paternsList}
				onPageChange={onPageChange}
				onSeach={onSearchPatterns}
				total={totalRecords}
				loading={loading}
				isShowTabs
				onTabChange={onTabChange}
				itemsTabs={categories}
				onStatusFilter={onStatusFilter}
				isShowStatusFilter
			/>
		</div>
	)
}

export default FreePatterns;
