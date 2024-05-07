import React from "react";
import { Col, Empty, Row } from "antd";
import { map } from "lodash";

import ReadMoreBtn from "components/ReadMoreBtn";
import HeaderPart from "../../../components/HeaderPart";

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
		<div className='patterns scroll-animate'>
			<HeaderPart
				titleId='home_freepattern_title'
				descriptionId='home_freepattern_description'
				isShowDivider
			/>
			<Row gutter={[24, 24]}>
				{
					map(patterns, (pattern, index) =>
						<Col key={`freepattern_${index}`} xs={24} sm={12} md={8} lg={6} >
							<CardFreePattern onReadDetail={() => onViewPattern(pattern.id || '')} pattern={pattern} />
						</Col>
					)
				}
			</Row>
			{patterns?.length > 0 ?
				< div className='read-more'>
					<ReadMoreBtn path={ROUTE_PATH.FREEPATTERNS} />
				</div> :
				<Empty
					imageStyle={{ height: 80 }}
					image={Empty.PRESENTED_IMAGE_SIMPLE}
				/>
			}
		</div >
	)
}

export default FreePatternsNode;