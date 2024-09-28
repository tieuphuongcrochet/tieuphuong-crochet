import React, { useEffect, useState } from 'react';
import ViewTable from 'components/ViewTable';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { DataType, Filter, initialViewTableParams } from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { filterByText, ROUTE_PATH } from 'utils';
import { patternAction, selectLoading, selectPatterns, selectTotalRecords } from 'saga/pattern/patternSlice';

const SavedFreePatterns = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const savedPatterns: DataType[] = useAppSelector(selectPatterns);
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
        dispatch(patternAction.fetchSavedPatterns(params));
    }, [params, dispatch]);

    const onSearchPatterns = (value: string) => {
        const filters: Filter = filterByText(value, 'name', 'description', 'author');
        const newParams = {
            ...initialViewTableParams,
            filters: [filters]
        };
        setParams(newParams);
    }

    const onViewPattern = (id: React.Key) => {
        navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
    };

    return (
        <Flex vertical className='saved-free-patterns-page scroll-animate' gap={30}>
            <ViewTable
                mode='Pattern'
                onReadDetail={(id) => onViewPattern(id)}
                pageIndex={params._pageNo}
                pageSize={params._pageSize}
                dataSource={savedPatterns}
                onPageChange={onPageChange}
                onSeach={onSearchPatterns}
                total={totalRecords}
                loading={loading}
            />
        </Flex>
    )
}

export default SavedFreePatterns;