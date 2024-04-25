import { Form, Input, TreeSelect, Button, Row, Col, Flex, Switch, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import UploadFiles from "components/Upload";
import { FileUpload, Pattern } from "models";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATH } from "utils";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { patternAction, selectPattern } from "saga/pattern/patternSlice";
import { categoryAction } from "../../../saga/category/categorySlice";

type UploadMode = 'directory' | 'crop' | 'normal';
const UPLOAD_MODES = ['crop', 'normal'];
// const UPLOAD_MODES = ['directory', 'crop', 'normal'];

const CRUPattern = () => {
    const [imageMode, setImageMode] = useState<UploadMode>('normal');
    const [fileMode, setFileMode] = useState<UploadMode>('normal');

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
        console.log('sendData', sendData);

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

    const radioItems = UPLOAD_MODES.map((type) => (
        <Radio key={type} value={type}>
            <span style={{ textTransform: 'capitalize' }}>{type}</span>
        </Radio>
    ));

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
                    name='images'
                    label='Photos'>
                    <div style={{ paddingBottom: '10px' }}>
                        <Radio.Group value={imageMode} onChange={(e) => setImageMode(e.target.value)}>
                            {radioItems}
                        </Radio.Group>
                    </div>
                    <UploadFiles
                        directory={imageMode === 'directory'}
                        isCropImage={imageMode === 'crop'}
                        files={pattern.images || []}
                        onChangeFile={(files: FileUpload[]) => {
                            form.setFieldsValue({ images: files });
                        }}
                    />
                </Item>
                <Item
                    name='files'
                    label='Pattern'>
                    <div style={{ paddingBottom: '10px' }}>
                        <Radio.Group value={fileMode} onChange={(e) => setFileMode(e.target.value)}>
                            {radioItems}
                        </Radio.Group>
                    </div>
                    <UploadFiles
                        directory={fileMode === 'directory'}
                        isCropImage={fileMode === 'crop'}
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