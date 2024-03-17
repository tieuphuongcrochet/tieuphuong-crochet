import { Col, Divider, Flex, Row } from "antd"
import { map } from "lodash";

import DownloadImage from "components/DownloadImage"
import { Pattern } from "models";
import './style.scss';

interface IntroductionCardProps {
	data: Pattern
};

const IntroductionCard = ({ data }: IntroductionCardProps) => {
	const { src, name, author, description, images } = data;
	return (
		<Row className="introduction-card" gutter={30}>
			<Col xs={24} md={12}>
				<DownloadImage width='100%' src={src} />
				<Flex className="thumbnail-photos">
					{
						images && map(images, image => (
							<DownloadImage preview={false} src={image.fileContent} />)
						)
					}
				</Flex>
			</Col>
			<Col xs={24} md={12}>
				<span className="card-title mt-0">{name}</span><br />
				<span className="author">Tác giả: <i>{author}</i></span>
				<Divider />
				<p className="description">{description}</p>
			</Col>
		</Row>
	)
}

export default IntroductionCard;
