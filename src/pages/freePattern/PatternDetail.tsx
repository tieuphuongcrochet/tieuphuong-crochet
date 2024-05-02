import { Divider, Space } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Pattern } from "models";
import { useAppDispatch, useAppSelector } from "app/hooks";
import IntroductionCard from "components/IntroductionCard";
import { patternAction, selectPattern } from "saga/pattern/patternSlice";
import ViewImagesList from "components/ViewImagesList";

const PatternDetail = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const pattern: Pattern = useAppSelector(selectPattern);

	useEffect(() => {
		if (id) {
			dispatch(patternAction.fetchPattern(id));
		}
	}, []);

	return (
		<Space direction="vertical" size={60} style={{ width: '100%' }} className="pattern-detail">
			{/* Introducing the pattern */}
			<IntroductionCard isShowThumbnail data={pattern} />
			<Divider />

			{/* Chart detail */}
			<ViewImagesList
				name='pattern'
				content={pattern.content}
				images={pattern.files}
				detailId='free_pattern_detail.detail'
				contentId="free_pattern_detail.content"
			/>
		</Space>
	)
}

export default PatternDetail;