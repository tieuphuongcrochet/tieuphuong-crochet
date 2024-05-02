import React from "react";
import { Col, Empty, Row } from "antd";

import CardBlog from "components/CardBlog";
import ReadMoreBtn from "components/ReadMoreBtn";
import { ROUTE_PATH } from "utils/constant";
import HeaderPart from "../../../components/HeaderPart";
import { useAppSelector } from "app/hooks";
import { selectBlogs } from "../homeSlice";
import { map } from "lodash";

const BlogsNode = () => {
	const blogs = useAppSelector(selectBlogs);

	return (
		<div className='blogs'>
			<HeaderPart titleId='home_blog_title'
				descriptionId='home_blog_description'
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
