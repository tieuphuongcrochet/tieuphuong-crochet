import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Flex, Form, Input, Row, Space } from 'antd';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authActions } from './authSlice';
import { REGEX, ROUTE_PATH } from 'utils';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'assets/logo.png';

const Login = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { loading } = useAppSelector((state) => state.auth);

	const onFinish = (values: any) => {
		const callback = () => {
			navigate(ROUTE_PATH.HOME);
			form.resetFields();
		};

		dispatch(authActions.login({
			params: {
				email: values.email,
				password: values.password
			},
			callback
		}))
	};

	return (
		<div className='auth-page'>
			<Flex justify='center' className='logo'>
				<Link to={ROUTE_PATH.HOME} >
					<img src={logo} alt='Tiệm len Tiểu Phương' />
				</Link>
			</Flex>
			<Flex
				className="header-title"
				justify='center'>
				<h3 className="title">Login</h3>
			</Flex>
			<Row >
				<Col xs={20} sm={18} md={10}>
					<Form
						form={form}
						name="normal_login"
						className="login-form layout-wrap"
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Form.Item
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email'
								},
								{
									pattern: new RegExp(REGEX.EMAIL),
									message: 'Please input format email',
								},
							]}
						>
							<Input
								maxLength={100}
								placeholder="Email"
								prefix={<MailOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password'
								},
								{
									pattern: new RegExp(REGEX.PASSWORD),
									message: 'Format password incorrect',
								},
							]}
						>
							<Input.Password
								autoComplete="new-password"
								prefix={<LockOutlined className="site-form-item-icon" />}
								placeholder="Password" />
						</Form.Item>
						<Form.Item>
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Link className="login-form-forgot" to="#">
								Forgot password
							</Link>
						</Form.Item>
						<Form.Item name='actions' className='actions'>
							<Space size='small'>
								<Button
									type="primary"
									loading={loading}
									htmlType="submit"
									className="login-form-button btn-border"
									disabled={loading}
								>
									Log in
								</Button>
								Or <Link to={ROUTE_PATH.REGISTER}>Register now!</Link>
							</Space>
						</Form.Item>
					</Form>
				</Col>

			</Row>
		</div>
	);
};

export default Login;
