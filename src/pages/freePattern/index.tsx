import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { DataType, ListParams } from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'utils';

const initialListParams: ListParams = {
	_pageNo: 0,
	_pageSize: 12,
	_sortBy: 'id',
	_sortDir: 'asc',
	text: ''
};

const FreePatterns = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const paternsList: DataType[] = useAppSelector(selectPatterns);
	const totalRecords = useAppSelector(selectTotalRecords);
	const loading = useAppSelector(selectLoading);

	const [params, setParams] = useState(initialListParams);

	const onChange = (current: number, pageSize: number) => {
		console.log('parent node', current, pageSize);
		const newParams = {
				...params,
				_pageNo: current - 1,
				_pageSize: pageSize,
		}
		setParams(newParams)
		console.log( 'newParams', newParams);
		dispatch(patternAction.fetchData(newParams));
	}

	useEffect(() => {
		dispatch(patternAction.fetchData(params));
	}, []);

	const onSearchPatterns = (value: string) => {
		console.log('onsearch', value);
		const newParams = {
			...initialListParams,
			text: value
		};
		setParams(newParams)
		dispatch(patternAction.fetchData(newParams));

	}

	const onViewPattern = (id: React.Key) => {
		console.log('onview pattern', id);
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)

	};

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
			/>
		</div>
	)
}

export default FreePatterns;
