import { SearchProps } from 'antd/es/input';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, initialListParams } from 'models';
import { useEffect, useState } from 'react';
import { postAction, selectLoading, selectPosts, selectTotalRecords } from './postSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const PostsList = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const totalRecords = useAppSelector(selectTotalRecords);
    const originData: DataType[] = useAppSelector(selectPosts);
    const [params, setParams] = useState(initialListParams);

    useEffect(() => {
        dispatch(postAction.fetchData(params));
    }, [params]);


    const onEditRecord = (rd: React.Key) => {
        console.log('edit rd', rd);
    }

    const onDeleteRecord = (rd: React.Key) => {
        console.log('delete rd', rd);
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
    }

    const onPageChange = (pagination: any, filters: any, sorter: any) => {
        const { current, pageSize } = pagination;
        const newParams = {
            ...params,
            _pageNo: current - 1,
            _pageSize: pageSize,
        }
        setParams(newParams)
        console.log('page', pagination, 'newParams', newParams);
    }

    const customColumns = [
        {
            title: 'Content',
            dataIndex: 'content',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
        }
    ];

    const onAddNew = () => { }
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
