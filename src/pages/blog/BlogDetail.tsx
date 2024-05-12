import { Col, Flex, Image, Row } from "antd";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Post } from "models/post";
import { postAction, selectPost } from "saga/post/postSlice";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LANGUAGES, getDateFormatted } from "utils";
import { Context } from "components/LanguageProvider";

import './style.scss';

const PostDetail = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const post: Post = useAppSelector(selectPost);
	const context = useContext(Context);

	useEffect(() => {
		if (id) {
			dispatch(postAction.fetchPost(id));
		}
	}, []);

	const { title, content, createdDate, src } = post;

	return (
		<div className="blog-detail-wrap">
			<Row gutter={[30, 30]}>
				<Col xs={24} sm={12} className="text-box">
					<h1>{title}</h1>
					{createdDate &&
						<Flex justify="flex-end">
							{getDateFormatted(createdDate, context.locale === LANGUAGES.EN ? 'en' : 'vi')}
						</Flex>
					}
				</Col>
				<Col xs={24} sm={12}>
					<Image preview={false} src={src} alt={title} />
				</Col>
				<Flex justify="center">
					<hr />
				</Flex>
				<Col>
					<div className="editor-view text-box" dangerouslySetInnerHTML={{ __html: content }} />
				</Col>
			</Row>
		</div>
	)
}

export default PostDetail;