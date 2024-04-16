import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { DataType, ListParams, initialListParams } from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';
import { useNavigate } from 'react-router-dom';
import { ALL_ITEM, ROUTE_PATH } from 'utils';
import { categoryAction } from 'pages/Admin/categories/categorySlice';

const FreePatterns = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const paternsList: DataType[] = useAppSelector(selectPatterns);
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
		dispatch(patternAction.fetchData(newParams));
	}

	useEffect(() => {
		dispatch(patternAction.fetchData(params));
	}, []);

	useEffect(() => {
		if (categories.length <= 0) {
			dispatch(categoryAction.fetchData(''));
		}
	}, []);

	const onSearchPatterns = (value: string) => {
		const newParams = {
			...initialListParams,
			categoryId: params.categoryId,
			searchText: value
		};
		setParams(newParams);
		dispatch(patternAction.fetchData(newParams));

	}

	const onViewPattern = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)

	};

	const onChangeTab = (key: string) => {
		const newParams: ListParams = {
			...initialListParams,
			categoryId: key === ALL_ITEM.key ? '' : key
		};

		setParams(newParams);
		dispatch(patternAction.fetchData(newParams));
	}

	return (
		<div className='free-patterns-page'>
			<ViewTable
				onReadDetail={(id) => onViewPattern(id)}
				isFreePatterns
				pageIndex={params._pageNo}
				pageSize={params._pageSize}
				dataSource={paternsList}
				onChange={onChange}
				onSeach={onSearchPatterns}
				total={totalRecords}
				loading={loading}
				isShowTabs
				onChangeTab={onChangeTab}
				itemsTabs={categories}
			/>
		</div>
	)
}

export default FreePatterns;
