import React from 'react';
import { Button, Image, Popconfirm, Table } from 'antd';
import { DataTableProps, DataType } from 'models';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { filter } from 'lodash';
import { IMAGE_FALLBACK, computePaging } from 'utils';

const DataTable = ({
  dataSource,
  customColumns,
  isShowImage,
  visiblePagination,
  totalPageSize,
  pageSize = 0,
  pageIndex = 0,
  onEditRecord,
  onDeleteRecord,
  onPageChange,
  onShowSizeChange,
  onTableChange,
  ...restProps
}: DataTableProps) => {

  const colNumberIndex = {
    title: '#',
    align: 'center',
    key: 'numberIndex',
    render: (_value: any, _row: any, index: number) => computePaging({ pageIndex, pageSize, currentIndex: index }),
    width: '80px',
  };

  const defaultColumns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'key',
    //   width: '150px',
    // },
    colNumberIndex,
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      width: '110px',
      render: (_: any, record: DataType) =>
        dataSource && dataSource.length > 0 ?
          <>
            <Button
              style={{ marginRight: '10px' }}
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => onEditRecord(record.key, record)}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDeleteRecord(record.key)}>
              <Button
                shape='circle'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>

          </> : null
    },
  ];

  const newColumns: any =
    customColumns ?
      [
        // {
        //   title: 'ID',
        //   dataIndex: 'key',
        //   width: '150px',
        // },
        colNumberIndex,
        (isShowImage ?

          {
            title: 'Image',
            dataIndex: 'imgUrl',
            width: '120px',
            render: (_: any, rd: DataType) =>
              <Image
                width={88}
                src={rd.src}
                fallback={IMAGE_FALLBACK}
              />
          } : {}),
        {
          title: 'Name',
          dataIndex: 'name',
        },
        ...customColumns,
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'x',
          width: '110px',
          render: (_: any, record: DataType) =>
            dataSource && dataSource.length > 0 ?
              <>
                <Button
                  style={{ marginRight: '10px' }}
                  shape='circle'
                  icon={<EditOutlined />}
                  onClick={() => onEditRecord(record.key)}
                />
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => onDeleteRecord(record.key)}>
                  <Button
                    shape='circle'
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>

              </> : null
        }] : [...defaultColumns];

  const paginationProps = visiblePagination ? {
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize,
    ...(pageIndex !== - 1 ? { current: pageIndex + 1 } : {}), // if not use value = -1
    ...(totalPageSize !== -1 ? { total: totalPageSize } : {}),
    ...(onPageChange ? { onchange: onPageChange } : {}),
    ...(onShowSizeChange ? { onShowSizeChange } : {}),
    showTotal: (total: number, range: any) => `${range[0]}-${range[1]} of ${total} items`
  } : false;
  return (
    <Table
      bordered
      dataSource={dataSource}
      columns={filter(newColumns, col => Object.keys(col).length !== 0)}
      pagination={paginationProps}
      onChange={onTableChange}
      {...restProps}
    />
  );
};

export default DataTable;
