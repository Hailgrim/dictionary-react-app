import React from 'react';

const Footer: React.FunctionComponent = () => {
	return (
		<footer className="footer">
			<div className="container">
				Powered by
				<br />
				<a className="footer__link" href="https://dictionaryapi.com/">Merriam-Webster Dictionary API</a>
			</div>
		</footer>
	);
}
export default Footer;