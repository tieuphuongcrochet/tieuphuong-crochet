import { SearchProps } from 'antd/es/input';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, Filter, ListParams, initialListParams, initialViewTableParams } from 'models';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';
import { ALL_ITEM, ROUTE_PATH } from 'utils';

const PatternsList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const originData: DataType[] = useAppSelector(selectPatterns);
    const totalRecords = useAppSelector(selectTotalRecords);
    const loading = useAppSelector(selectLoading);

    const [params, setParams] = useState(initialListParams)

    useEffect(() => {
        dispatch(patternAction.fetchData(params));
    }, [params]);

    console.log('originData', originData);

    const onEditRecord = (id: React.Key) => {
        navigate(`${ROUTE_PATH.ADMIN_PATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
    }

    const onDeleteRecord = (rd: React.Key) => {
        dispatch(patternAction.delete(rd));
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        const newParams = {
            ...initialListParams,
            searchText: value
        };
        setParams(newParams)
    }

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            width: '25%',
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

    const onFilter = (filters: Filter[]) => {
        console.log('filter', filters);
        const newParams = {
            ...params,
            filters: filters
        }
        setParams(newParams)
    }

    const onChangeCategory = (key: string) => {
        const newParams: ListParams = {
            ...initialViewTableParams,
            categoryId: key === ALL_ITEM.key ? '' : key
        };
        setParams(newParams);
    }

    return (
        <>
            <div className='patterns-admin'>
                <SearchTable
                    isShowFilter
                    onAddNew={onAddNew}
                    onSearch={onSearch}
                    onFilter={(filters) => { onFilter(filters) }}
                    onChangeCategory={onChangeCategory}
                    loading={loading}
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
