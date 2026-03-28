import { Link } from 'react-router';
import './ErrorPage.css';
import Header from '../../components/Header/Header.jsx';
import Logo from '../../assets/images/just-eat-logo.png';

function ErrorPage() {
	return (
		<>
			<Header logo={Logo}/>
			<div className="error-page">
				<h1 className="error-page__title">Page not found!</h1>
				<Link to="/" className="error-page__link">Go to search page</Link>
			</div>
		</>
	)
};

export default ErrorPage;