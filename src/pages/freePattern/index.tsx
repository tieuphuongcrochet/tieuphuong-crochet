import React from 'react';
import DataTable from 'components/DataTable';
import { MOCK_FREE_PATTERNS } from 'utils';

const FreePatterns = () => {
	const onChange = (page: number, pageSize: number) => {
		console.log('parent node', page, pageSize);
	}

	const onSearchPatterns = (value: string) => {
		console.log('onsearch', value);

	}
	return (
		<div className='free-patterns-page'>
			<DataTable
				isFreePatterns
				dataSource={MOCK_FREE_PATTERNS}
				onChange={onChange}
				onSeach={onSearchPatterns}
				total={50}
			/>
		</div>
	)
}

export default FreePatterns;
