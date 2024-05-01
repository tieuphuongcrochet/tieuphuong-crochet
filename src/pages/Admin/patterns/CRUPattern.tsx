import { Form, Input, TreeSelect, Button, Row, Col, Flex, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { cloneDeep } from "lodash";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { ROUTE_PATH } from "utils";
import UploadFiles from "components/UploadFiles";
import { FileUpload, Pattern } from "models";
import { patternAction, selectPattern } from "saga/pattern/patternSlice";
import { categoryAction } from "saga/category/categorySlice";
import EditorComponent from "components/Editor";

const CRUPattern = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const pattern: Pattern = useAppSelector(selectPattern);
    const categories = useAppSelector(state => state.category.data);

    useEffect(() => {
        if (id) {
            dispatch(patternAction.fetchPattern(id));
        }
        if (categories.length <= 0) {
            dispatch(categoryAction.fetchData());
        }
    }, []);

    useEffect(() => {
        if (id && pattern.name) {
            const tempData = cloneDeep(pattern);
            const newPattern = {
                ...tempData,
                category_id: tempData.category?.id
            }
            form.setFieldsValue(newPattern);
        }
    }, [pattern, id]);

    const onSubmitForm = (values: Pattern) => {
        let sendData = { ...values }
        if (id) {
            sendData = {
                ...sendData,
                id: id
            }
        }
        const callback = () => {
            form.resetFields();
            navigate(ROUTE_PATH.ADMIN_PATTERNS);
        };
        dispatch(patternAction.cUPattern({ params: sendData, callback }));
    }

    const onCancel = () => {
        form.resetFields();
        dispatch(patternAction.resetPattern());
        navigate(-1);
    }

    return (<>
        <div className="crupattern-page">
            <Flex justify="center">
                <h1>{id ? 'Update the pattern' : 'Create a new pattern'}</h1>
            </Flex>
            <Form layout="vertical"
                name='CUCategoryForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
            >
                <Item
                    name='images'
                    label='Photos'>
                    <UploadFiles
                        files={pattern.images || []}
                        onChangeFile={(files: FileUpload[]) => {
                            form.setFieldsValue({ images: files });
                        }}
                    />
                </Item>
                <Row gutter={48}>
                    <Col xs={24} md={12}>
                        <Item
                            name="name"
                            label="Pattern name:"
                            rules={[{ required: true, message: 'Please enter pattern name' }]}
                        >
                            <Input placeholder="Pattern name" />
                        </Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Item
                            name="author"
                            label="Author:"
                            rules={[{ required: true, message: 'Please enter the author' }]}
                        >
                            <Input placeholder="Author" />
                        </Item>
                    </Col>
                </Row>

                <Row gutter={48}>
                    <Col md={12} xs={24}>
                        <Item
                            name='category_id'
                            label='Category'
                            rules={[{ required: true, message: 'Please select the category' }]}
                        >
                            <TreeSelect
                                treeData={categories}
                            />
                        </Item>
                    </Col>

                    <Col md={12} xs={24}>
                        <Item
                            name="is_home"
                            label="Show on home page"
                        >
                            <Switch />
                        </Item>
                    </Col>
                </Row>
                <Item
                    name="link"
                    label="Link"
                >
                    <Input placeholder="Link mua hang" />
                </Item>
                <Item
                    name="description"
                    label="Description:"
                >
                    <TextArea rows={4} placeholder="Description" />
                </Item>
                <Item
                    name='files'
                    label='Pattern'>
                    <UploadFiles
                        files={pattern.files || []}
                        onChangeFile={(files: FileUpload[]) => {
                            form.setFieldsValue({ files: files });
                        }}
                    />
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
                    <Button className="btn-form" type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                </Flex>
            </Form>

        </div>
    </>)
}

export default CRUPattern;