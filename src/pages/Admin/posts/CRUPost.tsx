import { Form, Input, Button, Flex, Row, Col, Switch } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { postAction, selectPost } from "saga/post/postSlice";
import { Post } from "models/post";
import { ROUTE_PATH } from "utils";
import UploadFiles from "components/UploadFiles";
import { FileUpload } from "models";
import EditorComponent from "components/Editor";

const CRUPost = () => {
    const [form] = Form.useForm();
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
            form.setFieldsValue(post);
        }
    }, [post]);

    const onSubmitForm = (values: any) => {
        console.log('values', values);

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
                <Row>
                    <Col xs={24} md={12}>
                        <Item
                            name='files'
                            label='Image:'>
                            <UploadFiles
                                isShowDirectory={false}
                                isMultiple={false}
                                files={post.files || []}
                                imgsNumber={1}
                                onChangeFile={(files: FileUpload[]) => {
                                    form.setFieldsValue({ files: files });
                                }}
                            />
                        </Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Item
                            name='is_home'
                            label='Show on home'>
                            <Switch />
                        </Item>
                    </Col>
                </Row>
                <Item
                    name="title"
                    label="Post title:"
                    rules={[{ required: true, message: 'Please enter post title' }]}
                >
                    <Input placeholder="Post title" />
                </Item>
                <Item
                    name='content'
                    label='Pattern text'
                >
                    <EditorComponent onBlur={(_, editor) => {
                        form.setFieldsValue({ content: editor.getData() })
                    }} />
                </Item>
                <Flex justify="center" gap={10} wrap="wrap">
                    <Button
                        className="btn-form"
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                    {/* <Button className="btn-form" htmlType="reset">reset</Button> */}
                    <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                </Flex>
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