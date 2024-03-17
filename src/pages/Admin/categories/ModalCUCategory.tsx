import React, { useEffect } from 'react';
import { Form, Input, Modal, Select, } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { categoryAction } from './categorySlice';
import { DefaultOptionType } from 'antd/es/select';
import { Category } from 'models';


interface PropsCUCategory {
  categorySelected: Category;
  setCategorySelected: Function;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  parents: DefaultOptionType[]
}

const ModalCUCategory = ({ isModalOpen, setIsModalOpen, parents, categorySelected, setCategorySelected }: PropsCUCategory) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(categorySelected).length > 0) {
      const formData: Category = {
        id: categorySelected.id,
        name: categorySelected.name,
        parentId: categorySelected.parentId
      }
      form.setFieldsValue(formData);
    }
  }, [categorySelected]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log('form values', values);
        dispatch(categoryAction.cUCategory(values));
        handleCancel();
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleCancel = () => {
    categorySelected && setCategorySelected({});
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={Object.keys(categorySelected).length > 0 ? 'Update the category' : 'Create a new category'}
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
          <Form.Item
            name="parentId"
            label="Parents"
          >
            <Select
              allowClear
              options={parents}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCUCategory;
