import { Button, Col, Divider, Flex, Row } from "antd"
import { map } from "lodash";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import DownloadImage from "components/DownloadImage"
import { Pattern, Product } from "models";
import './style.scss';
import { useEffect, useRef, useState } from "react";
import { DragScroll, getElement } from "utils";
import { Link } from "react-router-dom";

interface IntroductionCardProps {
	data: Pattern | Product,
	isShowThumbnail?: boolean
};

const IntroductionCard = ({ data, isShowThumbnail }: IntroductionCardProps) => {
	const { src, name, author, description, images, link } = data;
	const [activeThumbnail, setActiveThumbnail] = useState({ index: 0, src });

	const sliderRef = useRef(null);
	const IMAGE_MARGIN = 10;
	const IMAGE_AMOUNT = 4;

	const onClickThumbnail = (index: number, url: string) => {
		setActiveThumbnail({ index: index, src: url });
	}

	useEffect(() => {
		if (images && images?.length > 1) {
			DragScroll('.images-outer');

			const widthThumbnail = getElement('.images').offsetWidth;
			const thumbnailItems = document.querySelectorAll('.thumbnail-item');
			for (let i = 0; i < thumbnailItems.length; i++) {
				const item = thumbnailItems[i] as HTMLElement;
				const size = `${widthThumbnail / IMAGE_AMOUNT - IMAGE_MARGIN}px`;
				item.style.width = size;
				item.style.height = size;
			}

			if (images.length > 4) {
				getElement('.thumbnail-photos').classList.add('show-prev-next');
			}
		}
	}, [images]);

	const getImageWidth = () => {
		return (getElement('.thumbnail-item').offsetWidth + IMAGE_MARGIN) * IMAGE_AMOUNT;
	}

	const onClickPrev = () => {
		onMouseClickPrev(getImageWidth());
	}

	const onClickNext = () => {
		onMouseClickNext(getImageWidth());
	}

	const onMouseClickNext = (offsetWidth: number) => {
		const container = sliderRef.current as unknown as HTMLDivElement;
		let scrollLeft = container.scrollLeft;
		scrollLeft += offsetWidth;
		if (scrollLeft >= container.scrollWidth) { scrollLeft = container.scrollWidth; }
		container.scrollLeft = scrollLeft;
	}

	const onMouseClickPrev = (offsetWidth: number) => {
		const container = sliderRef.current as unknown as HTMLDivElement;
		let scrollLeft = container.scrollLeft;
		scrollLeft -= offsetWidth;
		if (scrollLeft <= 0) {
			scrollLeft = 0;
		}
		container.scrollLeft = scrollLeft;
	}

	return (
		<Row className="introduction-card" gutter={30}>
			<Col xs={24} md={12}>
				<DownloadImage width='100%' src={activeThumbnail.src} />
				{
					(images && images?.length > 1 && isShowThumbnail) &&
					<div className="thumbnail-photos">
						<div ref={sliderRef} className="images-outer">
							<Flex className="images" >
								{
									images && map(images, (image, index) => (
										<DownloadImage
											onClick={() => onClickThumbnail(index, image.url)}
											className={`${activeThumbnail.index === index ? 'active-thumbnail thumbnail-item' : 'thumbnail-item'}`}
											preview={false}
											key={`intro_img_${index}`}
											src={image.fileContent} />)
									)
								}
							</Flex>
						</div>
						<div className="prev-next">
							<Button onClick={onClickPrev} shape="circle" className="prev" icon={<LeftOutlined />} />
							<Button onClick={onClickNext} shape="circle" className="next" icon={<RightOutlined />} />
						</div>

					</div>
				}
			</Col>
			<Col xs={24} md={12}>
				<span className="card-title mt-0">{name}</span><br />
				{author && <span className="author">Tác giả: <i>{author}</i></span>}
				<Divider />
				<p className="description">{description}</p>
				{link && <Link to={link || '#'} target="_blank"> <Button type="primary">Mua ngay</Button></Link>}
			</Col>
		</Row>
	)
}

export default IntroductionCard;

