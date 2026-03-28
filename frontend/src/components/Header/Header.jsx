import { Link } from 'react-router';
import './Header.css';

function Header({logo}) {
    return (
	<header className="header">
		<Link to="/">
			<img className="header__logo" src={logo} alt="company logo"/>
		</Link>
	</header>
    )
}; 

export default Header;