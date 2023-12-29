import React from "react";
import { Col, Row } from "antd";

import ReadMoreBtn from "components/ReadMoreBtn";
import HeaderPart from "./HeaderPart";

import { MOCK_FREE_PATTERNS, ROUTE_PATH } from "utils/constant";
import CardFreePattern from "components/CardPattern";

const FreePatternsNode = () => {
	return (
		<div className='patterns'>
			<HeaderPart title='Free Patterns'
				description='Đây là những chart miễn phí mình sưu tầm. Nếu mình nhỡ đăng phải chart bản quyền, xin nhắc mình gỡ xuống nhé.'
			/>
			<Row gutter={[30, 50]}>
				{
					MOCK_FREE_PATTERNS.map(({ name, author, src }, index) =>
						<Col key={`freepattern_${index}`} xs={12} sm={8} lg={6} >
							<CardFreePattern src={src} title={name} author={author} />
						</Col>
					)
				}
			</Row>
			<div className='read-more'><ReadMoreBtn path={ROUTE_PATH.FREEPATTERNS} /></div>
		</div>
	)
}

export default FreePatternsNode;