import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import './style.scss';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from './authSlice';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);

		dispatch(authActions.login({
			username: values.username,
			password: values.password
		}))
	};

	return (
		<Layout className='layout-wrap login-page'>
			<div className='login-box'>
				<Form
					name="normal_login"
					className="login-form layout-wrap"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<a className="login-form-forgot" href="">
							Forgot password
						</a>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
						Or <a href="">register now!</a>
					</Form.Item>
				</Form>
			</div>
		</Layout>
	);
};

export default Login;
