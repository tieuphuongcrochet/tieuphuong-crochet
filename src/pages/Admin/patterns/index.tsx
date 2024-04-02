import { SearchProps } from 'antd/es/input';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, initialListParams } from 'models';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';
import { ROUTE_PATH } from 'utils';

const PatternsList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const originData: DataType[] = useAppSelector(selectPatterns);
    const totalRecords = useAppSelector(selectTotalRecords);
    const loading = useAppSelector(selectLoading);

    console.log('originData patterns', originData);
    const [params, setParams] = useState(initialListParams)

    useEffect(() => {
        dispatch(patternAction.fetchData(params));
    }, []);

    const onEditRecord = (id: React.Key) => {        
       navigate(`${ROUTE_PATH.ADMIN_PATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
    }

    const onDeleteRecord = (rd: React.Key) => {
        console.log('delete rd', rd);
        dispatch(patternAction.delete(rd));
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
        const newParams = {
            ...initialListParams,
            searchText: value
        };
        setParams(newParams)
        dispatch(patternAction.fetchData(newParams));
    }

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
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
        console.log('page', pagination, 'newParams', newParams);
        dispatch(patternAction.fetchData(newParams));

    }

    return (
        <>
            <div className='patterns-admin'>
                <SearchTable onAddNew={onAddNew} onSearch={onSearch} loading={loading}/>
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
