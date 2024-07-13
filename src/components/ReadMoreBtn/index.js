import React from "react";
import { Link } from "react-router-dom";
import './style.scss';
import { FormattedMessage } from "react-intl";

const ReadMoreBtn = ({ path, className = '' }) => {
	const classess = className ? `readmore-btn ${className}` : 'readmore-btn';

	return (
		<div className={classess}>
			<Link to={path} ><FormattedMessage id='btn_readmore' /></Link>
		</div>
	)
}

export default ReadMoreBtn;
