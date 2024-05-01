import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { useNavigate } from 'react-router-dom';

import { DataType, initialViewTableParams } from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ROUTE_PATH } from 'utils';
import { postAction, selectPosts, selectTotalRecords, selectLoading } from 'saga/post/postSlice';

const BlogsPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const blogs: DataType[] = useAppSelector(selectPosts);
	const totalRecords = useAppSelector(selectTotalRecords);
	const loading = useAppSelector(selectLoading);

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
		dispatch(postAction.fetchData(params));
	}, [params]);

	const onSearchPatterns = (value: string) => {
		const newParams = {
			...initialViewTableParams,
			searchText: value
		};
		setParams(newParams);
	}

	const onViewBlog = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
	};


	return (
		<div className='free-patterns-page'>
			<ViewTable
				mode='Blog'
				onReadDetail={(id) => onViewBlog(id)}
				isFreePatterns
				pageIndex={params._pageNo}
				pageSize={params._pageSize}
				dataSource={blogs}
				onPageChange={onPageChange}
				onSeach={onSearchPatterns}
				total={totalRecords}
				loading={loading}
			/>
		</div>
	)
}

export default BlogsPage;
