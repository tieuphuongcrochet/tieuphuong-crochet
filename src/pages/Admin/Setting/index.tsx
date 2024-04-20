import { Form, Input, Button, Space, Select, Row, Col, Image, Flex } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Post } from "models/post";
import { ROUTE_PATH, mapDataToSelectOption } from "utils";
import UploadFiles from "components/Upload";
import { initialListParams } from "models";
import { productAction, selectProducts } from "../products/productSlice";

interface SelectOption {
    label: string;
    value: string,
    src: string
};

const Setting = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const products = useAppSelector(selectProducts);

    useEffect(() => {
        if (id) {
            // dispatch(postAction.fetchPost(id));
        }
    }, [id]);

    console.log('setting page', products);

    useEffect(() => {
        if (products.length < 1) {
            dispatch(productAction.fetchData({ ...initialListParams, _pageSize: 1000 }));
        }
    }, []);
    // useEffect(() => {
    //     if (post.title) {
    //         form.setFieldsValue(post);
    //     }
    // }, [post]);

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
        // dispatch(postAction.cUPost({ params: sendData, callback }));
    }

    const onCancel = () => {
        form.resetFields();
        // dispatch(postAction.resetPost());
        navigate(-1);
    }

    const getImageProduct = (id: any) => {
        const product = products.find(p => p.key === id);
        return (product?.src || product?.files?.[0]) as string;
    };

    return (<>
        <div className="cupost-page">
            <Form layout="vertical"
                name='CUPostForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
            >
                <Item
                    label="Banner list" name='banners'>
                    <Select
                        placeholder="Select product to show on banner"
                        options={mapDataToSelectOption(products)}
                        optionRender={(option) => (
                            <Flex gap={24} align="center">
                                <Image
                                    src={getImageProduct(option.value)}
                                    preview={false}
                                    width={50}
                                    height={50} />
                                <label >{option.label}</label>
                            </Flex>
                        )}
                    />
                </Item>
                <Row gutter={24}>
                    <Col xs={24} md={12} xl={6}>
                        <Item name='coverProduct' label='Cover photo Product'>
                            <UploadFiles
                                files={[]}
                                onChangeFile={(files: File[]) => {
                                    form.setFieldsValue({ coverProduct: files });
                                }}
                            />
                        </Item>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Item name='coverPattern' label='Cover photo Pattern'>
                            <UploadFiles
                                files={[]}
                                onChangeFile={(files: File[]) => {
                                    form.setFieldsValue({ coverPattern: files });
                                }}
                            />
                        </Item>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Item name='coverBlog' label='Cover photo blog page'>
                            <UploadFiles
                                files={[]}
                                onChangeFile={(files: File[]) => {
                                    form.setFieldsValue({ coverBlog: files });
                                }}
                            />
                        </Item>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Item name='coverAbout' label='Cover photo About page'>
                            <UploadFiles
                                files={[]}
                                onChangeFile={(files: File[]) => {
                                    form.setFieldsValue({ coverAbout: files });
                                }}
                            />
                        </Item>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Item name='coverContact' label='Cover photo contact'>
                            <UploadFiles
                                files={[]}
                                onChangeFile={(files: File[]) => {
                                    form.setFieldsValue({ coverContact: files });
                                }}
                            />
                        </Item>
                    </Col>
                </Row>
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

export default Setting;
// "id": "string",
// "name": "string",
// "description": "string",
// "price": 0,
// "currencyCode": "USD",
// "files": [
//   "string"
// ]