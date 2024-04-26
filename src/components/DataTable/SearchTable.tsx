import { useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, Radio, RadioChangeEvent, Row, Tooltip, TreeSelect } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Filter, SearchParams, SearchTableProps } from 'models';
import './style.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction } from 'saga/category/categorySlice';
import { ALL_ITEM, OPERATOR } from 'utils';
import { ReloadOutlined } from '@ant-design/icons';
import { SearchProps } from 'antd/es/input';


const initialFilter: Filter[] = [
    {
        field: 'isHome',
        value: '',
        operator: OPERATOR.EQUALS
    }
];

const initialSearchParams: SearchParams = {
    searchText: '',
    categoryId: '',
    filters: initialFilter
};

const SearchTable = ({
    onAddNew,
    onSearch,
    onSearchChange,
    textAddNew,
    loading,
    isShowFilter,
    isShowSearch = true }: SearchTableProps) => {
    const { Search } = Input;
    const [form] = Form.useForm();
    const categories = useAppSelector(state => state.category.data);
    const [searchParams, setSearchParams] = useState(initialSearchParams);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (categories.length <= 0) {
            dispatch(categoryAction.fetchData());
        }
    }, []);

    const onHandleSearch = (searchParams: SearchParams) => {
        setSearchParams(searchParams);
        onSearchChange instanceof Function && onSearchChange(searchParams);
    };

    const onchangeRadio = (e: RadioChangeEvent) => {
        const newFilter = [...searchParams.filters]
        newFilter[0].value = e.target.value;
        const newSearchParams: SearchParams = {
            ...searchParams,
            filters: newFilter
        };

        onHandleSearch(newSearchParams);
    };

    const onSearchText: SearchProps['onSearch'] = (value, _e, info) => {
        if (onSearch instanceof Function) {
            onSearch(value);
            return;
        }

        const newSearchParams: SearchParams = {
            ...searchParams,
            searchText: value
        };

        onHandleSearch(newSearchParams);
    }

    const onChangeCategory = (key: string) => {
        const categoryId = key || '';
        const newSearchParams: SearchParams = {
            ...searchParams,
            categoryId: key === ALL_ITEM.key ? '' : categoryId
        };

        onHandleSearch(newSearchParams);
    }

    const onReset = () => {
        const newFilters = initialFilter;
        form.resetFields();
        newFilters[0].value = '';
        onHandleSearch({
            ...initialSearchParams,
            filters: newFilters
        });
    }

    return (
        <Flex gap="small" className='search-table' justify='space-between'>
            {
                isShowSearch &&
                <Form
                    layout="vertical"
                    name='search-form'
                    form={form}
                    initialValues={{
                        isHome: '',
                    }}
                    style={{ flex: 'min-content' }}
                >
                    <Row style={{ width: '100%' }} gutter={12} className='search'>
                        <Col xs={24} md={15} lg={8}>
                            <Form.Item name='searchText'>
                                <Search
                                    allowClear
                                    size='large'
                                    placeholder='Search'
                                    onSearch={onSearchText}
                                    loading={loading}
                                    enterButton
                                    className='input-search'
                                />
                            </Form.Item>
                        </Col>
                        {
                            isShowFilter && (
                                <>
                                    <Col xs={24} md={9} lg={6}>
                                        <Form.Item name='categoryId'>
                                            <TreeSelect
                                                allowClear
                                                placeholder='Categories'
                                                treeData={categories}
                                                onChange={onChangeCategory}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={15} lg={6}>
                                        <Form.Item
                                            name='isHome'
                                            label='Show on home:'
                                        >
                                            <Radio.Group
                                                onChange={onchangeRadio}
                                            >
                                                <Radio value=''>All</Radio>
                                                <Radio value={true}>Yes</Radio>
                                                <Radio value={false}>No</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={16} md={9} lg={4}>
                                        <span>
                                            <Button
                                                style={{ textAlign: 'center', width: '120px' }}
                                                danger shape="default"
                                                icon={<ReloadOutlined />}
                                                htmlType="reset"
                                                onClick={onReset}
                                            >
                                                Reset
                                            </Button>
                                        </span>
                                    </Col>
                                </>
                            )
                        }

                    </Row>
                </Form>
            }
            <Button type="primary" onClick={onAddNew} icon={<PlusOutlined />}>
                {textAddNew || 'Add new'}
            </Button>
        </Flex>
    )
}

export default SearchTable;