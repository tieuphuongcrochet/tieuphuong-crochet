import { Flex, Form, Row, Col, Input, Button } from 'antd';

import { User } from 'models';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser, userAction } from './userSlice';
import { ROUTE_PATH } from 'utils';
import { cloneDeep } from 'lodash';
import UsersList from '.';

const CRUUser = () => {


    const [form] = Form.useForm();
    const { TextArea } = Input;
    const { Item } = Form;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const user: User = useAppSelector(selectUser);

    useEffect(() => {
        if (id) {
            dispatch(userAction.fetchUser(id));
        }
        if (UsersList.length <= 0) {
            dispatch(userAction.fetchData({
                _pageNo: 0,
                _pageSize: 0
            }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id && user.email) {
            const tempData = cloneDeep(user);
            const newUser = {
                ...tempData,
            }
            form.setFieldsValue(newUser);
        }
    }, [form, user, id]);

    const onSubmitForm = (values: User) => {
        let sendData = { ...values }
        if (id) {
            sendData = {
                ...sendData,
                id: id
            }
        }
        const callback = () => {
            form.resetFields();
            navigate(ROUTE_PATH.ADMIN_USERS);
        };
        dispatch(userAction.cUUser({ params: sendData, callback }));
    }

    const onCancel = () => {
        form.resetFields();
        dispatch(userAction.resetUser());
        navigate(-1);
    }

    return (
        <div>
            <Flex justify="center">
                <h1>{id ? 'Update the user' : 'Create a new user'}</h1>
            </Flex>
            <Form layout="vertical"
                name='CUserForm'
                form={form}
                onFinish={onSubmitForm}
                className="form-wrap"
            >
                <Row gutter={48}>
                    <Col xs={20} md={12}>
                        <Item
                            name="name"
                            label="User name:"
                            rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                            <Input placeholder="User name" />
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
                        </Row>
                    </Col>
                </Row>
                <Item
                    name="description"
                    label="Description:"
                >
                    <TextArea placeholder="Description" />
                </Item>
                <Flex justify='center' gap={24}>
                    <Button className="btn-form" type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button className="btn-form" onClick={onCancel}>Cancel</Button>
                </Flex>
            </Form>
        </div>
    );
};

export default CRUUser;