import React from "react";
import { Link } from "react-router-dom";
import './style.scss';

const ReadMoreBtn = ({ path, className = '' }) => {
	const classess = className ? `readmore-btn ${className}` : 'readmore-btn';

	return (
		<div className={classess}>
			<Link to={path} >Read more</Link>
		</div>
	)
}

export default ReadMoreBtn;
