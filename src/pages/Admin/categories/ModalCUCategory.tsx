import React from 'react';
import { Form, Input, Modal,} from 'antd';


interface PropsCUCategory {
  isModalOpen: boolean;
  setIsModalOpen: Function
}

const ModalCUCategory = ({ isModalOpen, setIsModalOpen }: PropsCUCategory) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log('form values', values);

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
            name="name"
            label="Name"
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
