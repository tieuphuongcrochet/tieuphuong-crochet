import { Alert, Divider, Space, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { Pattern } from "models";
import { useAppDispatch, useAppSelector } from "app/hooks";
import IntroductionCard from "components/IntroductionCard";
import { patternAction, selectLoading, selectPattern } from "saga/pattern/patternSlice";
import ViewImagesList from "components/ViewImagesList";

const PatternDetail = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const pattern: Pattern = useAppSelector(selectPattern);
	const loading = useAppSelector(selectLoading);

	useEffect(() => {
		if (id) {
			dispatch(patternAction.fetchPattern(id));
		}
		return () => {			
			dispatch(patternAction.resetPattern());
		}
	}, []);

	return (
		<Spin spinning={loading} tip="Loading...">
			<Space direction="vertical" size={60} style={{ width: '100%' }} className="pattern-detail scroll-animate">
				<Alert
					className="animation-alert"
					showIcon
					type="warning"
					message={<FormattedMessage id="free_pattern_note" />}
				/>
				{/* Introducing the pattern */}
				<IntroductionCard isShowThumbnail data={pattern} />
				<Divider />

				{/* Chart detail */}
				<ViewImagesList
					isPattern
					name='pattern'
					content={pattern.content}
					images={pattern.files}
					detailId='free_pattern_detail.detail'
					contentId="free_pattern_detail.content"
				/>
			</Space>
		</Spin>
	)
}

export default PatternDetail;