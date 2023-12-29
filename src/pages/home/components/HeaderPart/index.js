import React from "react";
import { Divider, Flex } from "antd";
import './style.scss';

const HeaderPart = ({ title, description, ...restProps }) => {
	return (
		<div className="header-part">
			<Divider className="header-divider" {...restProps} />
			{title && <div className="header-title">
				<Flex justify='center' ><h2 className="title">{title}</h2></Flex>
				<Flex justify='center' className="description">{description || 'Đây là những sản phẩm do mình làm.'}</Flex>
			</div>}
		</div>
	)
}

export default HeaderPart;
