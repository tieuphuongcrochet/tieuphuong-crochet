import { useAppSelector } from 'app/hooks';
import React from 'react';

const Contact = () => {
	const userRole = useAppSelector((state) => state.auth.currentUser);

	console.log('userRole', userRole);

	return (
		<div className='shop-page'>
			Contact page
		</div>
	)
}

export default Contact;
