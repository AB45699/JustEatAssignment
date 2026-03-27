import Logo from '../../assets/images/just-eat-logo.png';
import './Header.css';

function Header() {
    return (
    <header className="Header">
        <img src={Logo} height="90" alt="logo"/>
    </header>
    )
}; 

export default Header;