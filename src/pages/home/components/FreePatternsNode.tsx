import React from "react";
import { Col, Empty, Row } from "antd";
import { map } from "lodash";

import ReadMoreBtn from "components/ReadMoreBtn";
import HeaderPart from "../../../components/HeaderPart";

import { ROUTE_PATH } from "utils/constant";
import CardFreePattern from "components/CardPattern";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectHomeFreePatterns } from "../homeSlice";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "pages/login/authSlice";
import { patternAction } from "saga/pattern/patternSlice";

const FreePatternsNode = () => {
	const patterns = useAppSelector(selectHomeFreePatterns);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(selectIsLoggedIn);

	const onViewPattern = (id: React.Key) => {
		navigate(`${ROUTE_PATH.FREEPATTERNS}/${ROUTE_PATH.DETAIL}/${id}`)
	}

	const onSavePattern = (id: React.Key) => {
		if (isLoggedIn) {
			dispatch(patternAction.savePattern({ id, name: '' }));
		} else {
			navigate(ROUTE_PATH.LOGIN);
		}
	}

	return (
		<div className='patterns scroll-animate'>
			<HeaderPart
				titleId='home_freepattern_title'
				descriptionId='home_freepattern_description'
				isShowDivider
			/>
			<Row gutter={[{ xs: 8, sm: 16, xl: 24 }, { xs: 12, sm: 16, xl: 24 }]}>
				{
					map(patterns, (pattern, index) =>
						<Col key={`freepattern_${index}`} xs={12} sm={8} lg={6} >
							<CardFreePattern
								pattern={pattern}
								onReadDetail={() => onViewPattern(pattern.id || '')}
								onSave={() => onSavePattern(pattern.id || '')}
								showSaveButton={isLoggedIn}
							/>
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