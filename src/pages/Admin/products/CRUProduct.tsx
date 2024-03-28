import { Form, Input, TreeSelect, UploadFile, UploadProps, Upload, Modal, Button, Row, Col, InputNumber, Space, Select } from "antd";
import { useEffect, useState } from "react";
import { CURRENCY, ROUTE_PATH } from "utils";
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
        if(!categories || categories.length <= 0) {
            dispatch(categoryAction.fetchData(''));
            console.log('test');
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
            navigate(ROUTE_PATH.AMIN_PRODUCTS);
        };
        console.log('sendData', sendData);

        dispatch(productAction.cUProduct({ params: sendData, callback }));
    }

    const onCancel = () => {
        form.resetFields();
        dispatch(productAction.resetProduct());
        navigate(-1);
    }

    return (<>
        <div className="crupattern-page">
            <Form layout="vertical"
                name='CUCategoryForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
                initialValues={{currency_code: CURRENCY[0].value }}
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
                                options={CURRENCY}
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
                    name='files'
                    label='Image:'>
                    <UploadFiles
                        files={product.files || []}
                        onChangeFile={(files: FileUpload[]) => {
                            form.setFieldsValue({ files: files });
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