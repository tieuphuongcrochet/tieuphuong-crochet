import React from 'react';
import {
	DownloadOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, ImageProps, Space } from 'antd';

import logo from 'assets/logo.png';

interface DownloadImageProps extends ImageProps {
	src?: string;
	width?: number | string;
};

const DownloadImage = ({ src, width, ...restProps }: DownloadImageProps) => {
	// or you can download flipped and rotated image
	// https://codesandbox.io/s/zi-ding-yi-gong-ju-lan-antd-5-7-0-forked-c9jvmp
	const onDownload = () => {
		if (src) {
			fetch(src)
				.then((response) => response.blob())
				.then((blob) => {
					const url = URL.createObjectURL(new Blob([blob]));
					const link = document.createElement('a');
					link.href = url;
					link.download = 'image.png';
					document.body.appendChild(link);
					link.click();
					URL.revokeObjectURL(url);
					link.remove();
				});
		}
	};

	return (
		<Image

			width={width}
			src={src}
			fallback={logo}
			preview={{
				toolbarRender: (
					_,
					{
						transform: { scale },
						actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
					},
				) => (
					<Space size={12} className="toolbar-wrapper">
						{src && <DownloadOutlined onClick={onDownload} />}
						<SwapOutlined rotate={90} onClick={onFlipY} />
						<SwapOutlined onClick={onFlipX} />
						<RotateLeftOutlined onClick={onRotateLeft} />
						<RotateRightOutlined onClick={onRotateRight} />
						<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
						<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
					</Space>
				),
			}}
			{...restProps}
		/>
	);
};

export default DownloadImage;