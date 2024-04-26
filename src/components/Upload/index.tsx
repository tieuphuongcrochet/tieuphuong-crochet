import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop"
import { filter, map } from "lodash";

import { Modal, Radio, Upload, UploadFile, notification } from "antd"
import uploadFile from "api/uploadFile";
import { FileUpload, UPLOAD_MODES, UploadMode } from "models";

interface UploadFilesProps {
	onChangeFile: Function;
	files: FileUpload[];
	imgsNumber?: number;
};

const UploadFiles = ({ onChangeFile, files, imgsNumber = 20 }: UploadFilesProps) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState<any[]>([]);
	const [imageMode, setImageMode] = useState<UploadMode>('normal');

	useEffect(() => {
		if (files && files.length > 0) {
			const tempFiles = map(files, file => ({ url: file.fileContent }));
			setFileList(tempFiles);
		}
	}, [files])

	const getBase64 = (file: File): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});


	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as File);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	};

	const onUploadImage = async ({ file, onSuccess, onError }: any) => {

		const isLimit5Mb = file?.size / 1024 / 1024 < 5;
		if (!isLimit5Mb) {
			onError('fail');
			// onChangeFile("");
			notification.error({ message: 'Error', description: 'Allowed maxium size is 5Mb' });
			return;
		}

		const formData = new FormData();
		formData.append('files', file);
		const res: FileUpload[] = await uploadFile.upload(formData);

		if (res.length > 0) {
			const newFileList = [
				...fileList,
				{
					fileContent: res[0].fileContent,
					fileName: res[0].fileName,
					url: res[0].fileContent
				}
			]

			setFileList(newFileList);
			onChangeFile(newFileList);
			onSuccess('ok');
			notification.success({ message: 'Successful!', description: 'Upload file successfully!' });
		} else {
			onError('fail');
			notification.error({ message: '!Error', description: 'Allowed maxium size is 5Mb' });
		}
	};

	const onDelete = async (file: UploadFile) => {
		const newFileList = filter(fileList, f => f.uid !== file.uid);
		setFileList(newFileList);
		onChangeFile(map(newFileList, nf => nf.url));
		const res = await uploadFile.delete([file?.fileName as string]);
		console.log('res delete files', res);
	}

	const beforeUpload = (file: File) => {
		const isLt2M = file.size / 1024 / 1024 < 5;
		if (!isLt2M) {
			// message.error('Image must smaller than 5Mb!');
		}
		return isLt2M;
	}

	const uploadNode = (
		<Upload
			accept="image/png,image/jpeg,image/jpg,.pdf,.doc,.docx"
			customRequest={onUploadImage}
			listType="picture-card"
			onPreview={handlePreview}
			onRemove={onDelete}
			beforeUpload={beforeUpload}
			directory={imageMode === UPLOAD_MODES.DIRECTORY}
			fileList={fileList}
		>
			{fileList.length < 20 && '+ Upload'}
		</Upload>
	);

	const radioItems = map([UPLOAD_MODES.CROP, UPLOAD_MODES.NORMAL], type => (
		<Radio key={type} value={type}>
			<span style={{ textTransform: 'capitalize' }}>{type}</span>
		</Radio>
	));

	return (
		<>
			<div style={{ paddingBottom: '10px' }}>
				<Radio.Group value={imageMode} onChange={(e) => setImageMode(e.target.value)}>
					{radioItems}
				</Radio.Group>
			</div>
			{
				imageMode === UPLOAD_MODES.CROP ? <ImgCrop
					rotationSlider
					cropShape='rect'
					showGrid
					aspectSlider
					showReset
				>
					<Upload
						accept="image/png,image/jpeg,image/jpg,.pdf,.doc,.docx"
						customRequest={onUploadImage}
						listType="picture-card"
						onPreview={handlePreview}
						onRemove={onDelete}
						beforeUpload={beforeUpload}
						multiple
						fileList={fileList}
					>
						{fileList.length < imgsNumber && '+ Upload'}
					</Upload>
				</ImgCrop> : uploadNode
			}
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	)
}

export default UploadFiles;