import React from "react";
import { Divider, Flex } from "antd";
import './style.scss';
interface HeaderPartProps {
	title?: string;
	description?: string;
	isShowDivider?: boolean;
};

const HeaderPart = ({ title, description, isShowDivider }: HeaderPartProps) => {
	return (
		<div className="header-part">
			{isShowDivider && <Divider className="header-divider" />}
			{title && <div className="header-title">
				<Flex justify='center' ><h2 className="title">{title}</h2></Flex>
				<Flex justify='center' className="description">
					{description || 'Đây là những sản phẩm do mình làm.'}
				</Flex>
			</div>}
		</div>
	)
}

export default HeaderPart;
