import React, {useEffect, useState} from 'react';
import ViewTable from 'components/ViewTable';
import {DataType, Filter, initialViewTableParams, ListParams} from 'models';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {patternAction, selectLoading, selectPatterns, selectTotalRecords} from 'saga/pattern/patternSlice';
import {useNavigate} from 'react-router-dom';
import {ALL_ITEM, FILTER_LOGIC, FILTER_OPERATION, filterByText, ROUTE_PATH} from 'utils';
import {categoryAction} from 'saga/category/categorySlice';
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
		dispatch(patternAction.fetchData(params));
	}, [params]);

	useEffect(() => {
		if (categories.length <= 0) {
			dispatch(categoryAction.fetchData());
		}
	}, []);

	const onSearchPatterns = (value: string) => {
		const filters: Filter[] = filterByText(value, 'name', 'description', 'author');
		console.log('filters', filters);
		
		const newParams = {
			...initialViewTableParams,
			filters
		};
		setParams(newParams);
	}

	const onViewPattern = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
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
		console.log('newParams', newParams);
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
			/>
		</div>
	)
}

export default FreePatterns;
