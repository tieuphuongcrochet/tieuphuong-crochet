import { Watermark, Flex, Row, Col, Image, Space, Empty } from "antd"
import DownloadImage from "components/DownloadImage"
import { map } from "lodash"
import { FileUpload } from "models"
import { FormattedMessage } from "react-intl"
import { IMAGE_FALLBACK } from "utils"

interface ViewImagesProps {
	images?: FileUpload[];
	titleId: string;
	name: string;
	content?: string
}

const ViewImagesList = ({ images, titleId, name, content = '' }: ViewImagesProps) => {
	return (
		<div>
			< Watermark
				content={['小方', 'Tiểu Phương Crochet']}
			>
				<Space
					size={30}
					style={{ width: '100%' }}
					direction="vertical"
					align="center"
					className={`${name}-detail-content`}
				>
					<h1 className="align-center mt-0">
						<FormattedMessage id={titleId} defaultMessage='Chi tiết' />
					</h1>
					{(!content && !images) &&
						<Empty
							imageStyle={{ height: 80 }}
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					}
					<Image.PreviewGroup
						fallback={IMAGE_FALLBACK}
					>
						<Flex className="image-detail" justify='center' wrap="wrap" gap={24}>
							<Row gutter={[12, 12]} className='justify-center'>
								{
									images && (images?.length > 1 ?
										map(images, (image, index) => (
											<Col md={12} >
												<DownloadImage
													key={`${name}_${index}`}
													src={image.fileContent} />
											</Col>
										)) :
										<Col md={20} >
											<DownloadImage
												key={`${name}_only`}
												src={images[0].fileContent} />
										</Col>)
								}
							</Row>
						</Flex>
					</Image.PreviewGroup>
					<h1 className="flex justify-center">Chart dịch/ translate chart</h1>
					{/* convert editor string to html */}
					<div dangerouslySetInnerHTML={{ __html: content || '' }} />
				</Space>
			</Watermark >
		</div>
	)
}
export default ViewImagesList;