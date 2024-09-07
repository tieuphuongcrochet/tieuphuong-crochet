import { useEffect, useState } from 'react';
import { Button, Col, Flex, Form, Input, Radio, RadioChangeEvent, Row, TreeSelect } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { SearchProps } from 'antd/es/input';

import { Filter, SearchParams, SearchTableProps } from 'models';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { categoryAction } from 'saga/category/categorySlice';
import { ALL_ITEM, filterByText, getCategoryFilter, getRadioFilter, getStatusFilter, mapNameFilters, TRANSLATION_OPTIONS, TRANSLATION_STATUS } from 'utils';
import './style.scss';
import PatternStatus from 'components/PatternStatus';
import { SegmentedValue } from 'antd/es/segmented';

const initialSearchParams: SearchParams = {
    filters: []
};

const SearchTable = ({
    onAddNew,
    onSearch,
    onSearchChange,
    textAddNew,
    loading,
    isShowFilter,
    isShowSearch = true,
    isShowAddNew = true,
    searchFields = ['name'],
    isShowStatusFilter
}: SearchTableProps) => {
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
        const isHomeFilter = getRadioFilter(e);

        const newFilters = mapNameFilters(searchParams.filters, 'isHome', isHomeFilter);

        const newSearchParams: SearchParams = {
            filters: newFilters
        };

        onHandleSearch(newSearchParams);
    };

    const onSearchText: SearchProps['onSearch'] = (value, _e, info) => {
        if (onSearch instanceof Function) {
            onSearch(value);
            return;
        }
        const searchField: Filter = filterByText(value, ...searchFields);
        const newFilters = mapNameFilters(searchParams.filters, 'searchText', searchField);

        const newSearchParams: SearchParams = {
            filters: newFilters
        };

        onHandleSearch(newSearchParams);
    }

    const onChangeCategory = (key: string) => {
        const categoryFilter = getCategoryFilter(key);

        const newFilters = mapNameFilters(searchParams.filters, 'category', categoryFilter);

        const newSearchParams: SearchParams = {
            filters: newFilters
        };

        onHandleSearch(newSearchParams);
    }

    const onChangeStatus = (value: SegmentedValue) => {
        const statusFilter = getStatusFilter(value);

        const newFilters = mapNameFilters(searchParams.filters, 'statusFilter', statusFilter);

        const newSearchParams: SearchParams = {
            filters: newFilters
        };

        onHandleSearch(newSearchParams);
    }

    const onReset = () => {
        form.resetFields();
        onHandleSearch({
            filters: []
        });
    }

    return (
        <Flex gap="small" wrap='wrap' className='search-table' justify='space-between'>
            {
                isShowSearch &&
                <Form
                    name='search-form'
                    layout="vertical"
                    labelWrap
                    form={form}
                    initialValues={{
                        isHome: ALL_ITEM.key,
                    }}
                    style={{ flex: 'min-content' }}
                >
                    <Row style={{ width: '100%' }} gutter={12} className='search'>
                        <Col xs={24} md={12} xl={12} xxl={6}>
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
                                    <Col xs={24} md={12} xl={12} xxl={4}>
                                        <Form.Item name='categoryId'>
                                            <TreeSelect
                                                allowClear
                                                placeholder='Categories'
                                                treeData={categories}
                                                onChange={onChangeCategory}
                                            />
                                        </Form.Item>
                                    </Col>
                                    {isShowStatusFilter &&
                                        <Col xs={24} lg={17} xl={13} xxl={9}>
                                            <Form.Item name='status'>


                                                {/* Translation status on large-screen*/}
                                                <PatternStatus
                                                    className='large-screen'
                                                    defaultValue={TRANSLATION_STATUS.ALL}
                                                    options={[
                                                        ...TRANSLATION_OPTIONS,
                                                        {
                                                            label: "translation_status.NONE",
                                                            value: 'NONE',
                                                        },
                                                    ]}
                                                    onChange={onChangeStatus}
                                                />
                                            </Form.Item>
                                        </Col>
                                    }
                                    <Col xs={24} lg={7} xl={7} xxl={2}>
                                        <Form.Item
                                            name='isHome'
                                            label='Show on home:'
                                        >
                                            <Radio.Group
                                                onChange={onchangeRadio}
                                            >
                                                <Radio value={ALL_ITEM.key}>All</Radio>
                                                <Radio value={true}>Yes</Radio>
                                                <Radio value={false}>No</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} xl={4} xxl={3}>
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
            {
                isShowAddNew &&
                <Button type="primary" onClick={onAddNew} icon={<PlusOutlined />}>
                    {textAddNew || 'Add new'}
                </Button>
            }
        </Flex>
    )
}

export default SearchTable;