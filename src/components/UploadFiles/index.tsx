import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop"
import { filter, map } from "lodash";
import { UploadOutlined } from '@ant-design/icons';
import { Modal, Radio, Spin, Upload, UploadFile, UploadProps, message } from "antd"

import uploadFile from "api/uploadFile";
import { FileUpload, UPLOAD_MODES, UploadMode } from "models";
import { getBase64, notification, showConfirmDelete } from "utils";

interface UploadFilesProps extends UploadProps {
	onChangeFile: Function;
	files: FileUpload[];
	imgsNumber?: number;
	multiple?: boolean;
};

const UploadFiles = ({ onChangeFile, files, imgsNumber = 20, multiple = true, ...restProps }: UploadFilesProps) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState<any[]>([]);
	const [imageMode, setImageMode] = useState<UploadMode>('normal');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (files && files.length > 0) {
			setFileList(files);
		}
	}, [files])

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as File);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	};

	const updateImages = (file: FileUpload) => {
		let newFilesList = [] as FileUpload[];

		setFileList((prevState) => {
			console.log();

			console.log('prevState', prevState);
			if (prevState.length > 0) {
				newFilesList = [...prevState];
			}
			newFilesList = [...newFilesList, file];

			console.log('newFilesList', newFilesList);

			onChangeFile(newFilesList);
			return newFilesList;
		});
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
		setLoading(true);
		const res: FileUpload[] = await uploadFile.upload(formData);

		if (res.length > 0) {
			const newFiles = {
				fileContent: res[0].fileContent,
				fileName: res[0].fileName,
				url: res[0].fileContent
			};

			updateImages(newFiles);
			setLoading(false);
			onSuccess('ok');
			notification.success({ message: 'Successful!', description: 'Upload file successfully!' });
		} else {
			onError('fail');
			notification.error({ message: '!Error', description: 'Allowed maxium size is 5Mb' });
		}
	};

	const customUploadFiles = ({ file, onSuccess, onError }: any) => {
		setTimeout(async () => {
			await onUploadImage({ file, onSuccess, onError });
		}, 1000);
	}

	const onDelete = async (file: UploadFile) => {
		const res: string[] = await uploadFile.delete([file?.fileName as string]);
		if (res.length > 0) {
			notification.error({ message: 'Error!', description: 'Delete file failed!' });
			return;
		}
		notification.success({ message: 'Successfully!', description: 'Delete successfully!' });

		const newFileList = filter(fileList, f => f.url !== file.url);
		console.log('delete - newfile list', newFileList);

		setFileList(newFileList);
		onChangeFile(newFileList);
	}


	const beforeUpload = (file: File) => {
		const isLt2M = file.size / 1024 / 1024 < 5;
		if (!isLt2M) {
			message.error('Image must smaller than 5Mb!');
		}
		return isLt2M;
	}

	const uploadNode = (
		<Upload
			accept="image/png,image/jpeg,image/jpg,.pdf,.doc,.docx"
			customRequest={customUploadFiles}
			listType="picture-card"
			onPreview={handlePreview}
			onRemove={file => showConfirmDelete(file, onDelete)}
			beforeUpload={beforeUpload}
			directory={imageMode === UPLOAD_MODES.DIRECTORY}
			fileList={fileList}
			multiple={multiple}
			{...restProps}
		>
			{fileList.length < imgsNumber &&
				<Spin spinning={loading}><UploadOutlined /> Upload</Spin>
			}
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
				imageMode === UPLOAD_MODES.CROP ?
					<ImgCrop
						rotationSlider
						cropShape='rect'
						showGrid
						aspectSlider
						showReset
					>
						{uploadNode}
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