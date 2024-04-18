import { useEffect, useState } from 'react';
import { Button, Col, Flex, Input, Radio, RadioChangeEvent, Row, TreeSelect } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Filter, SearchTableProps } from 'models';
import './style.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction } from 'pages/Admin/categories/categorySlice';
import { OPERATOR } from 'utils';

const initialFilter: Filter[] = [
    {
        field: 'isHome',
        value: '',
        operator: OPERATOR.EQUALS
    }
];

const SearchTable = ({ onAddNew, onSearch, onFilter, onChangeCategory, textAddNew, loading, isShowFilter }: SearchTableProps) => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.category.data);
    const [filters, setFilters] = useState<Filter[]>(initialFilter);

    useEffect(() => {
        if (categories.length <= 0) {
            dispatch(categoryAction.fetchData(''));
        }
    }, []);

    const onchangeRadio = (e: RadioChangeEvent) => {
        console.log('e', e.target.value);
        let newFilter = [] as Filter[];
        newFilter = [...filters]
        newFilter[0].value = e.target.value;
        setFilters(newFilter);
        onFilter instanceof Function && onFilter(newFilter);
    };

    // const onChangeCategory = (value: string) => {
    //     const newFilter: Filter[] = [...filters]
    //     newFilter[1].value = value || '';
    //     setFilters(newFilter)
    //     onFilter instanceof Function && onFilter(newFilter);
    // }

    return (
        <Flex className='search-table' justify='space-between'>
            <Row style={{ width: '100%' }} gutter={12} className='search'>
                <Col span={10}>
                    <Search
                        allowClear
                        size='large'
                        placeholder='Search'
                        onSearch={onSearch}
                        loading={loading}
                        enterButton
                    />
                </Col>
                <Col span={6}>
                    <TreeSelect
                        allowClear
                        placeholder='Categories'
                        treeData={categories}
                        onChange={onChangeCategory}
                    />
                </Col>
                {
                    isShowFilter && (
                        <>
                            {/* <Col span={6}>
                                <TreeSelect
                                    allowClear
                                    placeholder='Categories'
                                    treeData={categories}
                                    onChange={onChangeCategory}
                                />
                            </Col> */}
                            <Col span={4}>
                                <label>Show on home: </label>
                                <Radio.Group onChange={onchangeRadio} value={filters[0].value}>
                                    <Radio value=''>All</Radio>
                                    <Radio value={true}>Yes</Radio>
                                    <Radio value={false}>No</Radio>
                                </Radio.Group>
                            </Col>
                            <Col>
                                <Button >Reset</Button>
                            </Col>
                        </>
                    )
                }

            </Row>
            <Button type="primary" onClick={onAddNew} icon={<PlusOutlined />}>
                {textAddNew || 'Add new'}
            </Button>
        </Flex>
    )
}

export default SearchTable;