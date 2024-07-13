import * as React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'utils';

export const NotFound = () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={<Button className='btn-border' type="primary"><Link to={ROUTE_PATH.HOME}>Back Home</Link></Button>}
		/>
	)
}
