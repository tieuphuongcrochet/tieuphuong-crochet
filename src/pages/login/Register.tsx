import React, { useState } from "react";

import { Form, Input, Button, Row, Col, Flex } from 'antd';
import { REGEX, ROUTE_PATH } from "utils";
import { Link, useNavigate } from "react-router-dom";
import logo from 'assets/logo.png';
import { User } from "models";
import { useAppDispatch } from "app/hooks";
import { authActions } from "./authSlice";
import './style.scss';

const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [isDisable, setIsDisable] = useState(false);
	const [form] = Form.useForm();

	const onCancel = () => {
		form.resetFields();
	}

	const onSubmitRegister = async (values: User) => {
		const callback = () => {
			setIsDisable(true);
			navigate(ROUTE_PATH.LOGIN);
			form.resetFields();
		};

		if (values) {
			const params: User = {
				name: values.name,
				email: values.email,
				password: values.password,
				role: values.email === 'thamphuong.study@gmail.com' ? 'ADMIN' : 'USER'
			};
			console.log('params', params);
			dispatch(authActions.resigter({ params, callback }));
		}
	}

	return (
		<div className="container auth-page">
			<Flex justify='center' className='logo'>
				<Link to={ROUTE_PATH.HOME} >
					<img src={logo} alt='Tiệm len Tiểu Phương' />
				</Link>
			</Flex>
			<Flex vertical={true} className="header-title" align="center">
				<h2 className="title">Register account</h2>
				<h3>Đã có tài khoản? <Link to={ROUTE_PATH.LOGIN}>Sign in!</Link></h3>
			</Flex>
			<Row >
				<Col xs={20} sm={18} md={10}>
					<Form
						form={form}
						name="register"
						layout="vertical"
						autoComplete="off"
						onFinish={onSubmitRegister}
					>
						<Form.Item
							label='Full name'
							name="name"
							rules={[
								{
									required: true,
									message: 'Please input your fullname'
								},
							]}
						>
							<Input
								maxLength={100}
								placeholder="Fullname"
							/>
						</Form.Item>
						{/* <Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: 'Please input your username'
								},
								{
									pattern: new RegExp(REGEX.USERNAME),
									message: 'Username must not contain spaces or special characters',
								},
							]}
						>
							<Input maxLength={50} placeholder="Username" />
						</Form.Item> */}
						<Form.Item
							name="email"
							label='Email'
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
							<Input maxLength={100} placeholder="Email" />
						</Form.Item>
						<Form.Item
							name="password"
							label='Password'
							// tooltip="What do you want others to call you?"
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
							<Input.Password placeholder="Password" />
						</Form.Item>
						<Form.Item
							name="rePassword"
							label='Re-password'
							rules={[
								{
									required: true,
									message: 'Please input your pagssword again'
								},
								{
									validator: async (_, value) => {
										if (!value || form.getFieldValue('password') === value) {
											return Promise.resolve();
										}
										throw new Error('Do not match password above')
									}
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<div className="note">
							<p>
								<strong>Note:</strong>
							</p>
							<div>
								<p>- <span style={{ color: '#ff4d4f' }}>(*)</span>: required field</p>
								<p>- Password must contain at least 8 characters, including at least 1 uppercase letter, 1 special character, lowercase letter and number.</p>
							</div>
						</div>
						<div>
							<Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: 8 }} disabled={isDisable}>
								Submit
							</Button>
							<Button type="default" style={{ width: '100%' }} onClick={() => onCancel()} disabled={isDisable}>
								Cancel
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	)
}

export default RegisterPage;