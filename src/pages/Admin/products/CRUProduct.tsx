import { Form, Input, TreeSelect, UploadFile, UploadProps, Upload, Modal, Button, Row, Col, InputNumber, Space, Select } from "antd";
import { useState } from "react";
import ImgCrop from 'antd-img-crop';
import { getBase64 } from "utils";

const CRUProduct = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    // type FileType = Parameters<UploadProps, 'beforeUpload'>[0];

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };



    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        console.log('file', file);

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const onSubmitForm = (values: any) => {
        console.log('values', values);
        console.log('fileList', fileList);
    }

    return (<>
        <div className="crupattern-page">
            <Form layout="vertical"
                name='CUCategoryForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
            >
                <Row gutter={48}>
                    <Col xs={20} md={12}>
                        <Item
                            name="name"
                            label="Product name:"
                            rules={[{ required: true, message: 'Please enter product name' }]}
                        >
                            <Input placeholder="Product name" />
                        </Item>
                    </Col>
                    <Col xs={20} md={12}>
                        <Item
                            name='category'
                            label='Category'
                        >
                            <TreeSelect
                                treeData={[
                                    { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                                ]} />
                        </Item>
                    </Col>
                    <Col xs={20} md={12}>
                        <Item
                            name="price"
                            label='Price'
                        >
                            <InputNumber min={1} max={100000000} />
                        </Item>
                    </Col>
                    <Col xs={20} md={12}>
                        <Item
                            name="currency"
                            label='Currency'>
                            <Select
                                labelInValue
                                defaultValue={{ value: 'VND', label: 'VND' }}
                                options={[
                                    {
                                        value: 'VND',
                                        label: 'VND',
                                    },
                                    {
                                        value: 'USA',
                                        label: '$',
                                    },
                                ]}
                            />
                        </Item>
                    </Col>
                </Row>
                <Item
                    name="description"
                    label="Description:"
                >
                    <TextArea placeholder="Description" />
                </Item>

                <Item
                    name='image'
                    label='Image'>
                    <ImgCrop
                        rotationSlider
                        cropShape='rect'
                        showGrid
                        aspectSlider
                        showReset
                    >
                        <Upload
                            // action={file => uploadFile(file)}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={handlePreview}
                        >
                            {fileList.length < 20 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Item>
                <Item wrapperCol={{ span: 12, offset: 10 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="reset">reset</Button>
                    </Space>
                </Item>
            </Form>

        </div>
        <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
        >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    </>)
}

export default CRUProduct;
// "id": "string",
// "name": "string",
// "description": "string",
// "price": 0,
// "currencyCode": "USD",
// "files": [
//   "string"
// ]