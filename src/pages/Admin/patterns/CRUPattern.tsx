import { Form, Input, TreeSelect, Button, Row, Col, Flex, Switch, Spin, Segmented, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { cloneDeep } from "lodash";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { ROUTE_PATH, TRANSLATION_STATUS } from "utils";
import UploadFiles from "components/UploadFiles";
import { FileUpload, Pattern } from "models";
import { patternAction, selectLoading, selectPattern } from "saga/pattern/patternSlice";
import { categoryAction } from "saga/category/categorySlice";
import EditorComponent from "components/Editor";
import PatternStatus from "components/PatternStatus";

const CRUPattern = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const pattern: Pattern = useAppSelector(selectPattern);
    const loading: boolean = useAppSelector(selectLoading);
    const categories = useAppSelector(state => state.category.data);

    useEffect(() => {
        if (id) {
            dispatch(patternAction.fetchPattern(id));
        }
        if (categories.length <= 0) {
            dispatch(categoryAction.fetchData());
        }
        return () => {
            dispatch(patternAction.resetPattern());
        }
    }, []);

    useEffect(() => {
        if (id && pattern.name) {
            const tempData = cloneDeep(pattern);
            const newPattern = {
                ...tempData,
                category_id: tempData.category?.id,
                status: tempData.status || TRANSLATION_STATUS.NONE
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
            <Spin spinning={loading} tip="Loading...">
                <Form layout="vertical"
                    name='cUPatternForm'
                    form={form}
                    onFinish={onSubmitForm}
                    className="form-wrap"
                >
                    <Item
                        name='images'
                        label='Photos'
                        rules={[{ required: true, message: 'Please upload image for pattern' }]}
                    >
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
                    <Row gutter={48}>
                        <Col md={12} xs={24}>
                            <Item
                                name="status"
                                label="Translation"
                                rules={[{ required: true, message: 'Please enter pattern Translation' }]}

                            >
                                <PatternStatus
                                    defaultValue={TRANSLATION_STATUS.NONE}
                                    options={[
                                        {
                                            label: TRANSLATION_STATUS.NONE,
                                            tagColor: "default",
                                            value: TRANSLATION_STATUS.NONE
                                        },
                                        {
                                            label: TRANSLATION_STATUS.PENDING,
                                            tagColor: "processing",
                                            value: TRANSLATION_STATUS.PENDING
                                        },
                                        {
                                            label: TRANSLATION_STATUS.SUCCESS,
                                            tagColor: "success",
                                            value: TRANSLATION_STATUS.SUCCESS
                                        },
                                    ]}
                                />
                            </Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Item
                                name="link"
                                label="Link"
                            >
                                <Input placeholder="Link mua hang" />
                            </Item>
                        </Col>
                    </Row>

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
                        <EditorComponent
                            initialData={pattern?.content || ''}
                            onBlur={(_, editor) => {
                                form.setFieldsValue({ content: editor.getData() })
                            }}
                        />
                    </Item>
                    <Flex justify="center" gap={10} wrap="wrap">
                        <Button className="btn-form" type="primary" htmlType="submit" disabled={loading}>
                            Submit
                        </Button>
                        <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                    </Flex>
                </Form>
            </Spin>
        </div>
    </>)
}

export default CRUPattern;