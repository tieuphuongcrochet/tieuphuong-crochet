import { SearchProps } from 'antd/es/input';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType } from 'models';
const UsersList = () => {
    const originData: DataType[] = [];

    const onEditRecord = (rd: React.Key) => {
        console.log('edit rd', rd);
    }

    const onDeleteRecord = (rd: React.Key) => {
        console.log('delete rd', rd);
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
    }

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            width: '200px',
        },
    ]
    const onAddNew = () => { }
    return (
        <>
            <div className='users-admin'>
                <SearchTable onAddNew={onAddNew} onSearch={onSearch} />
                <div className='admin-table'>
                    <DataTable
                        dataSource={originData}
                        onDeleteRecord={onDeleteRecord}
                        onEditRecord={onEditRecord}
                        customColumns={columns}
                        isShowImage
                    />
                </div>
            </div>
        </>
    )
}

export default UsersList;
