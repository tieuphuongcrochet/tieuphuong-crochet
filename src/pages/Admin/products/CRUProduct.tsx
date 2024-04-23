import { Form, Input, TreeSelect, UploadFile, UploadProps, Upload, Modal, Button, Row, Col, InputNumber, Space, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { CURRENCY_LIST, ROUTE_PATH } from "utils";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { productAction, selectProduct } from "./productSlice";
import UploadFiles from "components/Upload";
import { FileUpload, Product } from "models";
import { categoryAction } from "../categories/categorySlice";
import { cloneDeep } from "lodash";

const CRUProduct = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    // type FileType = Parameters<UploadProps, 'beforeUpload'>[0];

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const categories = useAppSelector(state => state.category.data);
    const product: Product = useAppSelector(selectProduct);

    useEffect(() => {
        if (!categories || categories.length <= 0) {
            dispatch(categoryAction.fetchData(''));
        }
        if (id) {
            dispatch(productAction.fetchProduct(id));
        }
    }, []);


    useEffect(() => {
        if (id && product.name) {
            const tempData = cloneDeep(product);
            const newPattern = {
                ...tempData,
                category_id: tempData.category?.id
            }
            form.setFieldsValue(newPattern);
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
        dispatch(productAction.resetProduct());
        navigate(-1);
    }

    return (<>
        <div className="cruproduct-page">
            <Form layout="vertical"
                name='CUProductForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
                initialValues={{ currency_code: CURRENCY_LIST[0].value }}
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
                            name='category_id'
                            label='Category:'
                        >
                            <TreeSelect
                                treeData={categories}
                            />
                        </Item>
                    </Col>
                    <Col xs={20} md={12}>
                        <Item
                            name="price"
                            label='Price'
                        >
                            <InputNumber width={'100%'} min={1} max={100000000} />
                        </Item>
                    </Col>
                    <Col xs={20} md={12}>
                        <Item
                            name="currency_code"
                            label='Currency'
                        >
                            <Select
                                options={CURRENCY_LIST}
                            />
                        </Item>
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
                    label='Image:'>
                    <UploadFiles
                        files={product.images || []}
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
                        {/* <Button className="btn-form" htmlType="reset">reset</Button> */}
                        <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                    </Space>
                </Item>
            </Form>

        </div>
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