import React from "react";
import HeaderPart from "./HeaderPart";
import { Col, Row } from "antd";
import CardBlog from "../../../components/CardBlog";
import ReadMoreBtn from "../../../components/ReadMoreBtn";
import { MOCK_BLOGS, ROUTE_PATH } from "../../../utils/constant";

const BlogsNode = () => {
	return (
		<div className='blogs'>
			<HeaderPart title='Blog'
				description='Đây là những bài viết của mình chia sẻ về móc len, và cuộc sống.'
			/>
			<Row gutter={[{xs: 12, md:16, xl: 32}, 24]}>
				{MOCK_BLOGS.map(({ src, title, description }, index) =>
					<Col key={`blog_${index}`} xs={24} md={12} lg={8}>
						<CardBlog src={src}
							title={title}
							description={description}
						/>
					</Col>
				)}
			</Row>
			<div className='read-more'>
				<ReadMoreBtn path={ROUTE_PATH.BLOG} />
			</div>
		</div>
	)
}

export default BlogsNode;
