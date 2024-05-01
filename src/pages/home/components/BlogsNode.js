import React from "react";
import { Col, Empty, Row } from "antd";

import CardBlog from "components/CardBlog";
import ReadMoreBtn from "components/ReadMoreBtn";
import { ROUTE_PATH } from "utils/constant";
import HeaderPart from "./HeaderPart";
import { useAppSelector } from "app/hooks";
import { selectBlogs } from "../homeSlice";
import { map } from "lodash";

const BlogsNode = () => {
	const blogs = useAppSelector(selectBlogs);

	return (
		<div className='blogs'>
			<HeaderPart title='Blog'
				description='Đây là những bài viết của mình chia sẻ về móc len, và cuộc sống.'
			/>
			<Row gutter={[{ xs: 12, md: 16, xl: 32 }, 24]}>
				{map(blogs, (item, index) =>
					<Col key={`blog_${index}`} xs={24} md={12} lg={8}>
						<CardBlog
							item={item}
						/>
					</Col>
				)}
			</Row>
			{
				blogs?.length > 0 ?
					<div className='read-more'>
						<ReadMoreBtn path={ROUTE_PATH.BLOG} />
					</div> :
					<Empty
						imageStyle={{ height: 80 }}
						image={Empty.PRESENTED_IMAGE_SIMPLE}
					/>
			}
		</div>
	)
}

export default BlogsNode;
