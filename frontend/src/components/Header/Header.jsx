import Logo from '../../assets/images/just-eat-logo.png';
import './Header.css';

function Header() {
    return (
    <header className="header">
        <img className="header__logo" src={Logo} alt="company logo"/>
    </header>
    )
}; 

export default Header;