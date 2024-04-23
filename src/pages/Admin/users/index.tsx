import { SearchProps } from 'antd/es/input';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType, initialListParams } from 'models';
import { selectLoading, selectUsers, userAction } from './userSlice';
import { useEffect, useState } from 'react';
const UsersList = () => {
    const originData: DataType[] = useAppSelector(selectUsers);
    const loading = useAppSelector(selectLoading);
    const dispatch = useAppDispatch();
    const [params, setParams] = useState(initialListParams)

    useEffect(() => {
        dispatch(userAction.fetchData(params));
    }, []);
    
    const onEditRecord = (rd: React.Key) => {
        console.log('edit rd', rd);
    }

    const onDeleteRecord = (rd: React.Key) => {
        console.log('delete rd', rd);
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
        const newParams = {
            ...initialListParams,
            searchText: value
        };
        setParams(newParams);
        dispatch(userAction.fetchData(newParams));
    }

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Created date',
            dataIndex: 'createdDate',
        },
        {
            title: 'Last modified date',
            dataIndex: 'lastModifiedDate',
        },
    ]
    const onAddNew = () => { }
    return (
        <>
            <div className='users-admin'>
                <SearchTable onAddNew={onAddNew} onSearch={onSearch} loading={loading}/>
                <div className='admin-table'>
                    <DataTable
                        loading={loading}
                        dataSource={originData}
                        onDeleteRecord={onDeleteRecord}
                        onEditRecord={onEditRecord}
                        customColumns={columns}
                    />
                </div>
            </div>
        </>
    )
}

export default UsersList;
