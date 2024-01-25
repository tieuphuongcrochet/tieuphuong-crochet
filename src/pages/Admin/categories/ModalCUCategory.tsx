import React from 'react';
import { Form, Input, Modal,} from 'antd';
import { useAppDispatch } from 'app/hooks';
import { categoryAction } from './categorySlice';


interface PropsCUCategory {
  isModalOpen: boolean;
  setIsModalOpen: Function
}

const ModalCUCategory = ({ isModalOpen, setIsModalOpen }: PropsCUCategory) => {
  const [form] = Form.useForm();
	const dispatch = useAppDispatch();

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
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form layout="vertical"
          name='CUCategoryForm'
          form={form}
        >
          <Form.Item
            name="categoryName"
            label="Category name "
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input ref={el => { setTimeout(() => el?.focus(), 0); }} placeholder="Category name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCUCategory;
