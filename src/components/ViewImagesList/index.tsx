import { Watermark, Flex, Row, Col, Image, Space, Empty } from "antd"
import DownloadImage from "components/DownloadImage"
import PdfViewer from "components/ViewPdf"
import { map } from "lodash"
import { FileUpload } from "models"
import { FormattedMessage } from "react-intl"
import { IMAGE_FALLBACK, checkPdfFile, } from "utils"

interface ViewImagesProps {
	images?: FileUpload[];
	name: string;
	content?: string
	detailId: string;
	contentId?: string;
}

const ViewImagesList = ({ images, detailId, name, content = '' }: ViewImagesProps) => {

	return (
		<div>
			< Watermark
				content={['小方', 'Tiểu Phương Crochet']}
			>
				<div
					className={`${name}-detail-content`}
				>
					<h1 className="align-center mt-0">
						<FormattedMessage id={detailId} defaultMessage='Chi tiết' />
					</h1>
					{(!content && !images) &&
						<Empty
							imageStyle={{ height: 80 }}
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					}
					{images && images.length > 0 &&
						<Image.PreviewGroup
							fallback={IMAGE_FALLBACK}
						>
							<Flex className="image-detail" justify='center' wrap="wrap" gap={24}>
								<Row style={{ width: '100%' }} gutter={[30, 30]} className='justify-center'>
									{
										images && (images?.length > 1 ?
											map(images, (image, index) => (
												<Col md={12} key={`${name}_${index}`}>
													<DownloadImage
														src={image.fileContent} />
												</Col>
											)) :
											<Col md={22} key={`${name}`}>
												{
													checkPdfFile(images[0]?.fileName) ?
														<PdfViewer pdfFile={images[0]?.fileContent} /> :
														<DownloadImage
															key={`${name}_only`}
															src={images[0]?.fileContent} />
												}
											</Col>)
									}
								</Row>
							</Flex>
						</Image.PreviewGroup>
					}
					{content &&
						<>
							<div className='editor-view disable-select text-box' dangerouslySetInnerHTML={{ __html: content || '' }} />
						</>
					}
				</div>
			</Watermark >
		</div>
	)
}
export default ViewImagesList;