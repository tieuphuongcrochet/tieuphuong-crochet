import {SearchProps} from 'antd/es/input';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import DataTable from 'components/DataTable';
import {DataType, Filter, initialListParams} from 'models';
import {selectLoading, selectUsers, userAction} from './userSlice';
import {useEffect, useState} from 'react';
import {filterByText, mapNameFilters, ROUTE_PATH} from "../../../utils";
import {useNavigate} from "react-router-dom";
import SearchTable from "../../../components/DataTable/SearchTable";

const UsersList = () => {
    const navigate = useNavigate();
    const originData: DataType[] = useAppSelector(selectUsers);
    const loading = useAppSelector(selectLoading);
    const dispatch = useAppDispatch();
    const [params, setParams] = useState(initialListParams)

    useEffect(() => {
        dispatch(userAction.fetchData(params));
    }, []);

    const onEditRecord = (id: React.Key) => {
        navigate(`${ROUTE_PATH.ADMIN_USERS}/${ROUTE_PATH.DETAIL}/${id}`)
    }

    const onDeleteRecord = (id: React.Key) => {
        dispatch(userAction.delete(id));
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        const filters: Filter = filterByText(value, 'name', 'role', 'email');
		const tempFilters = mapNameFilters(params.filters, 'searchText', filters);

        const newParams = {
            ...initialListParams,
			filters: tempFilters
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
    return (
        <>
            <div className='users-admin'>
                <SearchTable isShowAddNew={false} onSearch={onSearch} loading={loading} onAddNew={() => {
                }}/>
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
