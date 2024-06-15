import { Form, Input, TreeSelect, Button, Row, Col, InputNumber, Space, Select, Switch, Flex, Spin } from "antd";
import { useEffect } from "react";
import { CURRENCY_LIST, ROUTE_PATH } from "utils";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { productAction, selectLoading, selectProduct } from "saga/product/productSlice";
import UploadFiles from "components/UploadFiles";
import { FileUpload, Product } from "models";
import { categoryAction } from "saga/category/categorySlice";
import { cloneDeep } from "lodash";
import EditorComponent from "components/Editor";

const CRUProduct = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const categories = useAppSelector(state => state.category.data);
    const product: Product = useAppSelector(selectProduct);
    const loading: boolean = useAppSelector(selectLoading);

    useEffect(() => {
        if (!categories || categories.length <= 0) {
            dispatch(categoryAction.fetchData());
        }
        if (id) {
            dispatch(productAction.fetchProduct(id));
        }
        return () => {
            dispatch(productAction.resetProduct());
        }
    }, []);


    useEffect(() => {
        if (id && product.name) {
            const tempData = cloneDeep(product);
            const newProduct = {
                ...tempData,
                category_id: tempData.category?.id
            }
            form.setFieldsValue(newProduct);
        }
    }, [product, id]);

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
            navigate(ROUTE_PATH.AMIN_PRODUCTS);
        };
        dispatch(productAction.cUProduct({ params: sendData, callback }));
    }

    const onCancel = () => {
        form.resetFields();
        navigate(-1);
    }

    return (<>
        <div className="cruproduct-page">
            <Spin spinning={loading} tip="Loading...">

                <Form layout="vertical"
                    name='CUProductForm'
                    form={form}
                    onFinish={onSubmitForm}
                    className="form-wrap"
                    initialValues={{ currency_code: CURRENCY_LIST[0].value }}
                >
                    <Item
                        name='images'
                        label='Images:'>
                        <UploadFiles
                            files={product.images || []}
                            onChangeFile={(files: FileUpload[]) => {
                                form.setFieldsValue({ images: files });
                            }}
                        />
                    </Item>
                    <Row gutter={48}>
                        <Col span={24}>
                            <Item
                                name="name"
                                label="Product name:"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Product name" />
                            </Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Item
                                name='category_id'
                                label='Category:'
                                rules={[{ required: true, message: 'Please select the category' }]}
                            >
                                <TreeSelect
                                    treeData={categories}
                                />
                            </Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Space.Compact block>
                                <Item
                                    name="price"
                                    label='Price:'
                                    style={{ width: '70%' }}
                                >
                                    <InputNumber
                                        width={'100%'} min={1}
                                        max={100000000}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </Item>
                                <Item
                                    name="currency_code"
                                    label='Currency:'
                                    style={{ width: '30%' }}
                                >
                                    <Select
                                        options={CURRENCY_LIST}
                                    />
                                </Item>
                            </Space.Compact>

                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col xs={24} md={12}>
                            <Item
                                name="link"
                                label="Link:"
                            >
                                <Input placeholder="Link mua hang" />
                            </Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Item
                                name="is_home"
                                label="Show on home page:"
                            >
                                <Switch />
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
                        name='content'
                        label='Pattern text'
                    >
                        <EditorComponent
                            initialData={product?.content}
                            onBlur={(_, editor) => {
                                form.setFieldsValue({ content: editor.getData() })
                            }} />
                    </Item>
                    <Flex justify="center" gap={10} wrap="wrap">
                        <Button
                            className="btn-form"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                        {/* <Button className="btn-form" htmlType="reset">reset</Button> */}
                        <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                    </Flex>
                </Form>
            </Spin>
        </div>
    </>)
}

export default CRUProduct;
