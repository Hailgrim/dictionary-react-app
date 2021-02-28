import './Preloader.css';
import React from 'react';

const Preloader: React.FunctionComponent = () => {
	return (
		<div className="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
export default Preloader;