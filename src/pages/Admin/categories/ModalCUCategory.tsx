import React, { useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxOptionType, CheckboxProps, Divider, Form, Input, List, Modal, Popconfirm, Select, TreeSelect, TreeSelectProps, Typography, } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { categoryAction } from './categorySlice';
import { Category, DataType } from 'models';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

interface CUCategoryProps {
  categorySelected: DataType;
  setCategorySelected: Function;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  categories: CheckboxOptionType[];
}

const ModalCUCategory = ({ isModalOpen, setIsModalOpen, categorySelected, setCategorySelected, categories }: CUCategoryProps) => {
  const [form] = Form.useForm();
  const [childForm] = Form.useForm();
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const CheckboxGroup = Checkbox.Group;
  const dispatch = useAppDispatch();

  const isEditing = Object.keys(categorySelected || {}).length > 0;
  const checkAll = categories.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < categories.length;

  useEffect(() => {
    if (isEditing) {
      const formData: Category = {
        name: categorySelected.name,
      }
      form.setFieldsValue(formData);
    }
  }, [categorySelected]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {

        let sendData: Category = {
          name: values.name,
        }

        if (isEditing) {
          sendData = {
            ...sendData,
            id: categorySelected.key
          }
          dispatch(categoryAction.update(sendData));
        }
        else {
          sendData = {
            ...sendData,
            parentIds: checkedList
          };
          dispatch(categoryAction.create(sendData));
        }
        handleCancel();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleCancel = () => {
    categorySelected && setCategorySelected({});
    childForm.resetFields();
    form.resetFields();
    setCheckedList([]);
    setIsModalOpen(false);
  };

  const onDelete = (id: string) => {
    dispatch(categoryAction.delete(id));
  }

  const onUpdateChildCategory = (index: string) => {
    childForm.validateFields()
      .then((values) => {
        dispatch(categoryAction.update({
          id: index,
          name: values[`children${index}`]
        } as Category));
      })

      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? categories.map(category => category.value) : []);
  };

  const childActions = (key: string) => [
    <Button shape='circle' icon={<SaveOutlined />} onClick={() => onUpdateChildCategory(key)} />,
    <Popconfirm
      title="Sure to delete?"
      onConfirm={() => onDelete(key)}>
      <Button
        shape='circle'
        icon={<DeleteOutlined />}
      />
    </Popconfirm>
  ];

  return (
    <>
      <Modal
        title={isEditing ? 'Update the category' : 'Create a new category'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form layout="vertical"
          name='CUCategoryForm'
          form={form}
        >
          <Form.Item
            name="name"
            label="Category name "
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>

          {
            !isEditing ?
              // Form Creating
              <Form.Item
                name="parentIds"
                label="Parents"
              >
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}>
                  Check all
                </Checkbox>
                <Divider />
                <CheckboxGroup
                  options={categories}
                  value={checkedList}
                  onChange={onChange}
                />
              </Form.Item> :

              /* Form editing */
              < Form.Item name='children' label='Children'>
                <List
                  itemLayout="horizontal"
                  dataSource={categorySelected?.children}
                  renderItem={(item, index) => (
                    <List.Item
                      actions={childActions(item.key)}
                    >
                      <Typography.Text >[{index + 1}]</Typography.Text>
                      <Form
                        name='childrenForm'
                        layout='inline'
                        form={childForm}
                        initialValues={{ [`children${item.key}`]: item.name }}
                      >
                        <Form.Item
                          name={`children${item.key}`}
                        >
                          <Input placeholder="Child category" />
                        </Form.Item>
                      </Form>
                    </List.Item>
                  )}
                />
              </Form.Item>}
        </Form>
      </Modal >
    </>
  );
};

export default ModalCUCategory;
