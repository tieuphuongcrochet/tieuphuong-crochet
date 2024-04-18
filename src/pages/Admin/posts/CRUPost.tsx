import { Form, Input, Button, Space } from "antd";
import { useEffect } from "react";
import { postAction, selectPost } from "./postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Post } from "models/post";
import { ROUTE_PATH } from "utils";
import UploadFiles from "components/Upload";
import { FileUpload } from "models";

const CRUPost = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const post: Post = useAppSelector(selectPost);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(postAction.fetchPost(id));
        }
    }, [id]);

    useEffect(() => {
        if (post.title) {
            console.log('post', post);
            form.setFieldsValue(post);
        }
    }, [post]);

    const onSubmitForm = (values: any) => {
        let sendData = { ...values }
        if (id) {
            sendData = {
                ...sendData,
                id: id
            }
        }
        const callback = () => {
            form.resetFields();
            navigate(ROUTE_PATH.ADMIN_POSTS);
        };
        dispatch(postAction.cUPost({ params: sendData, callback }));
    }

    const onCancel = () => {
        form.resetFields();
        dispatch(postAction.resetPost());
        navigate(-1);
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
                    <TextArea rows={10} placeholder="Content" />
                </Item>
                <Item
                    name='images'
                    label='Image:'>
                    <UploadFiles
                        files={post.files || []}
                        onChangeFile={(files: FileUpload[]) => {
                            form.setFieldsValue({ images: files });
                        }}
                    />
                </Item>
                <Item wrapperCol={{ span: 12, offset: 10 }}>
                    <Space>
                        <Button className="btn-form" type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                    </Space>
                </Item>
            </Form>

        </div>

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