import React from 'react';
import { Button, Flex, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchTableProps } from 'models';
import './style.scss';

const SearchTable = ({ onAddNew, onSearch, textAddNew }: SearchTableProps) => {
    const { Search } = Input;

    return (
        <Flex className='search-table' justify='space-between'>
            <div className='search'>
                <Search placeholder='Search'
                    onSearch={onSearch}
                />
            </div>
            <Button type="primary" onClick={onAddNew} icon={<PlusOutlined />}>
                {textAddNew || 'Add new'}
            </Button>
        </Flex>
    )
}

export default SearchTable;