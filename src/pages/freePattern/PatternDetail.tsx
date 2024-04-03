import { Col, Divider, Flex, Image, Row, Space, Watermark } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import DownloadImage from "components/DownloadImage";
import IntroductionCard from "components/IntroductionCard";
import { map } from "lodash";
import { Pattern } from "models";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { patternAction, selectPattern } from "saga/pattern/patternSlice";
import logo from 'assets/logo.png';

const PatternDetail = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const pattern: Pattern = useAppSelector(selectPattern);
	console.log('pattern', pattern);

	useEffect(() => {
		if (id) {
			dispatch(patternAction.fetchPattern(id));
		}
	}, []);

	return (
		<Space direction="vertical" size={60} className="pattern-detail mt-content">
			{/* Introducing the pattern */}
			<IntroductionCard data={pattern} />
			<Divider />

			{/* Chart detail */}
			<Watermark
				content={['小方', 'Tiểu Phương Crochet']}
			>
				<div className="pattern-detail-content">
					<h1 className="flex justify-center">Chart chi tiết</h1>
					<Image.PreviewGroup
						fallback={logo}
					>
						<Flex className="image-detail" justify='center' wrap="wrap" gap={24}>
							<Row gutter={12}>
								{
									pattern.files && map(pattern.files, (image, index) => (
										<Col md={12} >
											<DownloadImage
												key={`pattern_${index}`}
												src={image.fileContent} />
										</Col>
									)
									)
								}
							</Row>

						</Flex>
					</Image.PreviewGroup>
				</div>
			</Watermark>
		</Space>
	)
}

export default PatternDetail;