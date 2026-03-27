import Logo from '../../assets/images/just-eat-logo.png';
import { Link } from 'react-router';
import './Header.css';

function Header() {
    return (
    <header className="header">
		<Link to="/">
        	<img className="header__logo" src={Logo} alt="company logo"/>
		</Link>
    </header>
    )
}; 

export default Header;