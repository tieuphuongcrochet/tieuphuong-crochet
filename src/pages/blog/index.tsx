import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { useNavigate } from 'react-router-dom';
import { Alert, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import {DataType, Filter, initialViewTableParams} from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {filterByText, ROUTE_PATH} from 'utils';
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

	const onSearchPosts = (value: string) => {
		const filters: Filter= filterByText(value, 'title');
		const newParams = {
			...initialViewTableParams,
			filters: [filters]
		};
		setParams(newParams);
	}

	const onViewBlog = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
	};

	return (
		<Flex vertical className='blog-page scroll-animate' gap={30}>
			<Alert
				type='success'
				className="animation-alert"
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
				onSeach={onSearchPosts}
				total={totalRecords}
				loading={loading}
			/>
		</Flex>
	)
}

export default BlogsPage;
