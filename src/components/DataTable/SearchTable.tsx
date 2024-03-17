import React from 'react';
import { Button, Flex, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchTableProps } from 'models';
import './style.scss';

const SearchTable = ({ onAddNew, onSearch, textAddNew, loading }: SearchTableProps) => {
    const { Search } = Input;

    return (
        <Flex className='search-table' justify='space-between'>
            <div className='search'>
                <Search
                    allowClear
                    size='large'
                    placeholder='Search'
                    onSearch={onSearch}
                    loading={loading}
                    enterButton
                />
            </div>
            <Button type="primary" onClick={onAddNew} icon={<PlusOutlined />}>
                {textAddNew || 'Add new'}
            </Button>
        </Flex>
    )
}

export default SearchTable;