import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';

import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, initialListParams } from 'models';
import { postAction, selectLoading, selectPosts, selectTotalRecords } from 'saga/post/postSlice';
import { ROUTE_PATH } from 'utils';

const PostsList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const totalRecords = useAppSelector(selectTotalRecords);
    const originData: DataType[] = useAppSelector(selectPosts);
    const [params, setParams] = useState(initialListParams);

    useEffect(() => {
        dispatch(postAction.fetchData(params));
    }, [params]);


    const onEditRecord = (rd: React.Key) => {
        navigate(`${ROUTE_PATH.ADMIN_POSTS}/${ROUTE_PATH.DETAIL}/${rd}`)
    }

    const onDeleteRecord = (rd: React.Key) => {
        dispatch(postAction.delete(rd));
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        const newParams = {
            ...params,
            searchText: value,
        }
        setParams(newParams);
    }

    const onPageChange = (pagination: any, filters: any, sorter: any) => {
        const { current, pageSize } = pagination;
        const newParams = {
            ...params,
            _pageNo: current - 1,
            _pageSize: pageSize,
        }
        setParams(newParams)
    }

    const customColumns = [
        {
            title: 'Show on home',
            dataIndex: 'is_home',
            render: (value: boolean) => value ? 'Yes' : 'No'
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
        }
    ];

    const onAddNew = () => { 
        navigate(`${ROUTE_PATH.ADMIN_POSTS}/${ROUTE_PATH.CREATE}`)
    }

    return (
        <>
            <div className='posts-admin'>
                <SearchTable onAddNew={onAddNew} onSearch={onSearch} />
                <div className='admin-table'>
                    <DataTable
                        loading={loading}
                        pageSize={params._pageSize}
                        pageIndex={params._pageNo}
                        isShowImage
                        visiblePagination
                        dataSource={originData}
                        totalPageSize={totalRecords}
                        onEditRecord={onEditRecord}
                        onTableChange={onPageChange}
                        onDeleteRecord={onDeleteRecord}
                        customColumns={customColumns}
                    />
                </div>
            </div>
        </>
    )
}

export default PostsList;
