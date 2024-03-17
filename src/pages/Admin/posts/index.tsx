import { SearchProps } from 'antd/es/input';
import DataTable from 'components/DataTable';
import SearchTable from 'components/DataTable/SearchTable';
import { DataType } from 'models';

const PostsList = () => {
   
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
            title: 'Author',
            dataIndex: 'author',
            width: '25%',
        },
    ]
    const onAddNew = () => { }
    return (
        <>
            <div className='posts-admin'>
                <SearchTable onAddNew={onAddNew} onSearch={onSearch} />
                <div className='admin-table'>
                    {/* <DataTable
                        dataSource={originData}
                        onDeleteRecord={onDeleteRecord}
                        onEditRecord={onEditRecord}
                        customColumns={columns}
                    /> */}
                </div>
            </div>
        </>
    )
}

export default PostsList;
