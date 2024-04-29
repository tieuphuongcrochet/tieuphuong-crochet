import { Alert, Button, Divider, Form, Input, Modal, Space } from "antd";
import React, { memo, useEffect, useState } from "react";
import { includes, map } from "lodash";

import DataTable from "components/DataTable"
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectBannerTypes, selectLoading, settingAction } from "../SettingSlice";
import { IBannerType, TBannerType } from "models/setting";
import { BANNER_TYPES_DEFAULT } from "utils";
import '../style.scss';

interface ModalForm {
	open: boolean;
	id: React.Key;
	name?: TBannerType;
}

interface TypeBannerModalProps {
	openCUModal: ModalForm;
	setOpenCUModal: (value: ModalForm) => void;
}

const CUTypeModal = ({ openCUModal, setOpenCUModal }: TypeBannerModalProps) => {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (openCUModal.id) {
			const formData: IBannerType = {
				name: openCUModal.name || '',
			}
			form.setFieldsValue(formData);
		}
	}, [openCUModal.id]);

	const onSubmit = () => {
		form.validateFields().then((values: IBannerType) => {
			const sendData = openCUModal.id ? { ...values, id: openCUModal.id } : values
			dispatch(settingAction.cUBannerTypes(sendData));
			setOpenCUModal({ open: false, id: '' });
			form.resetFields()
		})
			.catch((errorInfo: any) => {
				console.log('Failed:', errorInfo);
			});
	}

	const oncancel = () => {
		setOpenCUModal({ open: false, id: '', name: '' });
		form.resetFields()
	}

	const validateName = (name: any) => {
		if (includes(BANNER_TYPES_DEFAULT, name)) {
			return Promise.resolve();
		}
		return Promise.reject(new Error('Please enter a name belonging to 1 of the names above!'));
	}

	return (
		<Modal
			title={openCUModal.id ? 'Update the banner type' : 'Create a new banner type'}
			open={openCUModal.open}
			onOk={onSubmit}
			onCancel={oncancel}
			okText='Submit'>
			<Space direction='vertical'>
				<Alert showIcon message='Please enter a name belonging to 1 of the names below!' type='warning'
					description={
						<Space wrap>
							{map(BANNER_TYPES_DEFAULT, (b, index) => {
								if (index < BANNER_TYPES_DEFAULT.length - 2) {
									return <>
										<span key={`btype_${index}`}>{b} <Divider type="vertical" /></span>
									</>
								}
								return <span>{b}</span>
							})}
						</Space>}
				/>
				<Form name='CUType'
					layout="vertical"
					form={form}
				>
					<Form.Item
						name='name'
						label='Name:'
						rules={[{ required: true, message: 'Please enter the name' },
						{
							validator: (_, value) => validateName(value)
						}
						]}
					>
						<Input placeholder="Enter the name:" />
					</Form.Item>
				</Form>
			</Space>
		</Modal>
	)
}

const BannerType = () => {
	const [openCUModal, setOpenCUModal] = useState<ModalForm>({ open: false, id: '' });

	const dispatch = useAppDispatch();
	const bannerTypes = useAppSelector(selectBannerTypes);
	const loading = useAppSelector(selectLoading);

	useEffect(() => {
		dispatch(settingAction.fetchBannerTypes());
	}, []);

	const onDeleteRecord = async (id: React.Key) => {
		dispatch(settingAction.deleteBannerType(id));
	};

	const onEditRecord = (id: React.Key, values: IBannerType) => {
		setOpenCUModal({ open: true, id, name: values.name });
	}

	return (
		<>
			<div className="banner-type-wrapper">
				<h2 className="align-center">Banner Types</h2>
				<Button
					danger
					className="banner-type__create btn-border"
					onClick={() => setOpenCUModal({ open: true, id: '' })}
				>
					Create
				</Button>
				<DataTable
					loading={loading.bannerType}
					dataSource={bannerTypes}
					onDeleteRecord={onDeleteRecord}
					onEditRecord={onEditRecord} />
			</div>
			<CUTypeModal openCUModal={openCUModal} setOpenCUModal={setOpenCUModal} />
		</>
	)
}

export default memo(BannerType);