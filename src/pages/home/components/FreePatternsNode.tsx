import React from "react";
import { Col, Row } from "antd";
import { map } from "lodash";

import ReadMoreBtn from "components/ReadMoreBtn";
import HeaderPart from "./HeaderPart";

import { ROUTE_PATH } from "utils/constant";
import CardFreePattern from "components/CardPattern";
import { useAppSelector } from "app/hooks";
import { selectHomeFreePatterns } from "../homeSlice";
import { useNavigate } from "react-router-dom";

const FreePatternsNode = () => {
	const patterns = useAppSelector(selectHomeFreePatterns);
	const navigate = useNavigate();

	const onViewPattern = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
	}

	return (
		<div className='patterns'>
			<HeaderPart
				title='Free Patterns'
				isShowDivider
				description='Đây là những chart miễn phí mình sưu tầm. Nếu mình nhỡ đăng phải chart bản quyền, xin nhắc mình gỡ xuống nhé.'
			/>
			<Row gutter={[30, 50]}>
				{
					map(patterns, (pattern, index) =>
						<Col key={`freepattern_${index}`} xs={12} sm={8} lg={6} >
							<CardFreePattern onReadDetail={() => onViewPattern(pattern.id || '')} pattern={pattern} />
						</Col>
					)
				}
			</Row>
			<div className='read-more'><ReadMoreBtn path={ROUTE_PATH.FREEPATTERNS} /></div>
		</div>
	)
}

export default FreePatternsNode;