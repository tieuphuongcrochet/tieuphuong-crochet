import React from "react";
import { Divider, Flex } from "antd";
import { FormattedMessage } from "react-intl";
import './style.scss';

interface HeaderPartProps {
	titleId: string;
	descriptionId: string;
	isShowDivider?: boolean;
};

const HeaderPart = ({ titleId, descriptionId, isShowDivider }: HeaderPartProps) => {
	return (
		<div className="header-part responsive">
			{isShowDivider && <Divider className="header-divider" />}
			{titleId && <div className="header-title">
				<Flex justify='center' >
					<h2 className="title"><FormattedMessage id={titleId}/></h2>
				</Flex>
				<Flex justify='center' className="description">
					<FormattedMessage id={descriptionId}/>
				</Flex>
			</div>}
		</div>
	)
}

export default HeaderPart;
