import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { useNavigate } from 'react-router-dom';
import { Alert, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

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
		<Flex vertical className='blog-page' gap={30}>
			<Alert
				type='success'
				message={<FormattedMessage id='blog_title' />}
				description={<FormattedMessage id='blog_description' />}
				showIcon
			/>
			<ViewTable
				mode='Blog'
				onReadDetail={(id) => onViewBlog(id)}
				pageIndex={params._pageNo}
				pageSize={params._pageSize}
				dataSource={blogs}
				onPageChange={onPageChange}
				onSeach={onSearchPatterns}
				total={totalRecords}
				loading={loading}
			/>
		</Flex>
	)
}

export default BlogsPage;
