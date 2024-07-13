import { FormattedNumber } from 'react-intl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, SearchParams, initialListParams } from 'models';
import { productAction, selectLoading, selectProducts, selectTotalRecords } from 'saga/product/productSlice';
import { ROUTE_PATH } from 'utils';

const ProductsList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [params, setParams] = useState(initialListParams)
    const loading = useAppSelector(selectLoading);
    const totalRecords = useAppSelector(selectTotalRecords);
    const originData: DataType[] = useAppSelector(selectProducts);

    useEffect(() => {
        dispatch(productAction.fetchData(params));
    }, [params]);

    const onDeleteRecord = (rd: React.Key) => {
        dispatch(productAction.delete(rd));
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

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category: any) => (
                <span>{category?.name}</span>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '100px',
            render: (value: any) => (
                <span><FormattedNumber value={value} /></span>
            )
        },
        {
            title: 'Currency',
            dataIndex: 'currency_code',
            width: '100px',
        },
        {
            title: 'Show on home',
            dataIndex: 'is_home',
            render: (value: boolean) => value ? 'Yes' : 'No'
        },
    ];

    const onAddNew = () => {
        navigate(`${ROUTE_PATH.AMIN_PRODUCTS}/${ROUTE_PATH.CREATE}`)
    }

    const onEditRecord = (id: React.Key) => {
        navigate(`${ROUTE_PATH.AMIN_PRODUCTS}/${ROUTE_PATH.DETAIL}/${id}`)
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
            <div className='product-admin'>
                <SearchTable
                    isShowFilter
                    onAddNew={onAddNew}
                    onSearchChange={onSearchChange}
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

export default ProductsList;