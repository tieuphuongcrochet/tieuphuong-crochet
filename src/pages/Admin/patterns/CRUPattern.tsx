import { Form, Input, TreeSelect, Button, Row, Col, Flex, Switch } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import UploadFiles from "components/Upload";
import { FileUpload, Pattern } from "models";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATH } from "utils";
import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { patternAction, selectPattern } from "saga/pattern/patternSlice";
import { categoryAction } from "../categories/categorySlice";

const CRUPattern = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const pattern: Pattern = useAppSelector(selectPattern);
    const categories = useAppSelector(state => state.category.data);

    console.log('pattern detail', pattern);

    useEffect(() => {
        if (id) {
            dispatch(patternAction.fetchPattern(id));
        }
        if(categories.length <= 0) {
            dispatch(categoryAction.fetchData(''));
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
                <Row gutter={48}>
                    <Col xs={20} md={12}>
                        <Item
                            name="name"
                            label="Pattern name:"
                            rules={[{ required: true, message: 'Please enter pattern name' }]}
                        >
                            <Input placeholder="Pattern name" />
                        </Item>
                    </Col>
                    <Col xs={20} md={12}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Item
                                    name="author"
                                    label="Author:"
                                    rules={[{ required: true, message: 'Please enter the author' }]}
                                >
                                    <Input placeholder="Author" />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name='category_id'
                                    label='Category'
                                >
                                    <TreeSelect
                                        treeData={categories}
                                    />
                                </Item>
                            </Col>

                        </Row>
                    </Col>
                </Row>

                <Row gutter={48}>
                    <Col span={12}>
                        <Item
                            name="link"
                            label="Link"
                        >
                            <Input placeholder="Link mua hang" />
                        </Item>
                    </Col>

                    <Col span={12}>
                        <Item
                            name="is_home"
                            label="Show on home page"
                        >
                            <Switch />
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
                    name='images'
                    label='Photos'>
                    <UploadFiles
                        files={pattern.images || []}
                        onChangeFile={(files: FileUpload[]) => {
                            form.setFieldsValue({ images: files });
                        }}
                    />
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
                <Flex justify='center' gap={24}>
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
// "id": "string",
// "name": "string",
// "description": "string",
// "price": 0,
// "currencyCode": "USD",
// "files": [
//   "string"
// ]