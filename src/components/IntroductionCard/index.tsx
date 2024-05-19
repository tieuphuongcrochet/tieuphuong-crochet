import { Button, Col, Divider, Flex, Row, Space } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { findIndex, map } from "lodash";
import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import DownloadImage from "components/DownloadImage"
import { FileUpload, Pattern, Product } from "models";
import { DragScroll, SOCIAL_LINKS, getElement } from "utils";
import './style.scss';
import FormattedCurrency from "components/FormattedCurrency";
import { FormattedMessage } from "react-intl";

interface IntroductionCardProps {
	data: Pattern | Product,
	isShowThumbnail?: boolean,
	isPreviewAvatar?: boolean,
};

const IMAGE_MARGIN = 10;
const IMAGE_AMOUNT = 4;

const IntroductionCard = ({ data, isShowThumbnail, isPreviewAvatar }: IntroductionCardProps) => {
	const { src, name, author, description, images, link, price, currency_code } = data;
	const [activeThumbnail, setActiveThumbnail] = useState({ index: 0, src });

	const sliderRef = useRef(null);

	const onClickThumbnail = (index: number, url: string) => {
		setActiveThumbnail({ index, src: url });
	}

	useEffect(() => {
		return () => {
			setActiveThumbnail({ src: '', index: -1 });
		};
	}, []);

	useEffect(() => {

		if (src) {
			const index = findIndex(images, (img: FileUpload) => img.fileContent === src);
			index !== -1 && setActiveThumbnail({ index, src });
		}
		if (isShowThumbnail && images && images?.length > 1) {
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
				getElement('.thumbnail-photos')?.classList.add('show-prev-next');
			}
		}
	}, [data.name, src, images, isShowThumbnail]);

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
		<Row className="introduction-card" gutter={[30, 30]}>
			<Col xs={24} md={12}>
				<DownloadImage
					width='100%'
					src={activeThumbnail.src}
					preview={isPreviewAvatar}
				/>
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
											key={`intro_img_${index}`}
											src={image?.fileContent}
											preview={false}
										/>)
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
				<div className="text-box">
					<span className="card-title mt-0">{name}</span><br />
					{author && <span className="author"><FormattedMessage id='intro_author' /><i> {author}</i></span>}
					<p className="description">{description}</p>
					<Divider />
					<Space direction="vertical" size='middle'>
						{price && <FormattedCurrency price={price} currency_code={currency_code} />}
						{(price || link) && <Link to={link || SOCIAL_LINKS.FACEBOOK} target="_blank">
							<Button className="btn-border" type="primary">
								<FormattedMessage id='btn_buy' />
							</Button>
						</Link>}
					</Space>
				</div>
			</Col>
		</Row>
	)
}

export default memo(IntroductionCard);

