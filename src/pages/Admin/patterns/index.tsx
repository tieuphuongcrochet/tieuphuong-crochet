import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilters, ROUTE_PATH } from 'utils';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, SearchParams, initialListParams } from 'models';

const PatternsList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const originData: DataType[] = useAppSelector(selectPatterns);
    const totalRecords = useAppSelector(selectTotalRecords);
    const loading = useAppSelector(selectLoading);

    const [params, setParams] = useState(initialListParams)

    useEffect(() => {
        let tempParams = [...params.filters]
		if (tempParams.length > 0) {
			tempParams = getFilters(tempParams);
		}
		dispatch(patternAction.fetchData({ ...params, filters: tempParams }));
    }, [params]);

    const onEditRecord = (id: React.Key) => {
        navigate(`${ROUTE_PATH.ADMIN_PATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
    }

    const onDeleteRecord = (rd: React.Key) => {
        dispatch(patternAction.delete(rd));
    }

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category: any) => (
                <span>{category?.name}</span>
            )
        },
        {
            title: 'Author',
            dataIndex: 'author',
            width: '25%',
        },
        {
            title: 'Show on home',
            dataIndex: 'is_home',
            render: (value: boolean) => value ? 'Yes' : 'No'
        },
    ]

    const onAddNew = () => {
        navigate(`${ROUTE_PATH.ADMIN_PATTERNS}/${ROUTE_PATH.CREATE}`)
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

    const onSearchChange = (searchParams: SearchParams) => {
        
        const newParams = {
            ...params,
            ...searchParams
        }
        setParams(newParams)
    }

    return (
        <>
            <div className='patterns-admin'>
                <SearchTable
                    isShowFilter
                    onAddNew={onAddNew}
                    onSearchChange={onSearchChange}
                    loading={loading}
                    searchFields={['name', 'author', 'description']}
                />
                <div className='admin-table'>
                    <DataTable
                        loading={loading}
                        pageSize={params._pageSize}
                        pageIndex={params._pageNo}
                        isShowImage
                        visiblePagination
                        dataSource={originData}
                        customColumns={columns}
                        totalPageSize={totalRecords}
                        onEditRecord={onEditRecord}
                        onTableChange={onPageChange}
                        onDeleteRecord={onDeleteRecord}
                    />
                </div>
            </div>
        </>
    )
}

export default PatternsList;
