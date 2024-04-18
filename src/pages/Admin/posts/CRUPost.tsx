import { Form, Input, UploadFile, UploadProps, Upload, Modal, Button } from "antd";
import { useState } from "react";
import ImgCrop from 'antd-img-crop';

const CRUPost = () => {
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

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });


    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {

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
        <div className="cupost-page">
            <Form layout="vertical"
                name='CUPostForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
            >
                <Item
                    name="title"
                    label="Post title:"
                    rules={[{ required: true, message: 'Please enter post title' }]}
                >
                    <Input placeholder="Post title" />
                </Item>
                <Item
                    name="content"
                    label="Content:"
                >
                    <TextArea placeholder="Content" />
                </Item>

                <Item
                    name='post'
                    label='Post'>
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
                <Item wrapperCol={{ offset: 12, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
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

export default CRUPost;
// "id": "string",
// "name": "string",
// "description": "string",
// "price": 0,
// "currencyCode": "USD",
// "files": [
//   "string"
// ]